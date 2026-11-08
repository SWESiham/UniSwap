// اختبار HTTP ببديل مؤقت لعملية الحفظ؛ لا يتصل بـAtlas.
const assert = require('node:assert/strict');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User.ts').default;
const router = require('../src/routes/auth.routes.ts').default;

async function main() {
    const originalCreate = User.create;
    let saved;
    let failure;
    let calls = 0;
    User.create = async (data) => {
        calls++;
        if (failure) throw failure;
        saved = data;
        return { ...data, _id: 'test-user-id', createdAt: new Date() };
    };
    const app = express();
    app.use(express.json());
    app.use('/api/auth', router);
    const server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const url = `http://127.0.0.1:${server.address().port}/api/auth/register`;
    const valid = { name: ' Test User ', email: ' TEST@example.com ', password: 'test-password-123' };
    const post = body => fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    try {
        for (const body of [null, {}, { ...valid, email: 'wrong' },
            { ...valid, password: 'short' }, { ...valid, password: 'أ'.repeat(37) },
            { ...valid, role: 'admin' }, { ...valid, isBlocked: false }]) {
            assert.equal((await post(body)).status, 400);
        }
        assert.equal(calls, 0);
        const response = await post(valid);
        assert.equal(response.status, 201);
        const result = await response.json();
        assert.equal(saved.email, 'test@example.com');
        assert.equal(saved.name, 'Test User');
        assert.equal(saved.role, 'user');
        assert.equal(saved.isBlocked, false);
        assert.notEqual(saved.password, valid.password);
        assert.equal(await bcrypt.compare(valid.password, saved.password), true);
        assert.equal('password' in result.user, false);
        failure = Object.assign(new Error('duplicate'), { code: 11000 });
        assert.equal((await post(valid)).status, 409);
        failure = new Error('private database details');
        const failed = await post(valid);
        assert.equal(failed.status, 500);
        assert.equal((await failed.text()).includes('private database details'), false);
        console.log('Registration checks passed (mock database; no Atlas writes).');
    } finally {
        User.create = originalCreate;
        await new Promise(resolve => server.close(resolve));
    }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
