// اختبارات ببيانات مؤقتة في الذاكرة؛ مفيش اتصال بـAtlas.
const assert = require('node:assert/strict');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'temporary-test-secret-used-only-in-this-process';
const User = require('../src/models/User.ts').default;
const router = require('../src/routes/auth.routes.ts').default;
const { requireAuth } = require('../src/middlewares/auth.middleware.ts');
const { requireRole } = require('../src/middlewares/role.middleware.ts');

async function main() {
    const originalFindOne = User.findOne;
    const originalFindById = User.findById;
    let user = {
        _id: '507f1f77bcf86cd799439011', name: 'Student', email: 'student@example.com',
        password: await bcrypt.hash('password123', 4), role: 'user', isBlocked: false,
    };
    let databaseFailure = false;
    User.findOne = () => ({ select: async () => user });
    User.findById = async () => {
        if (databaseFailure) throw new Error('private details');
        return user;
    };
    const app = express();
    app.use(express.json());
    app.use('/api/auth', router);
    app.get('/protected', requireAuth, (req, res) => res.json(req.user));
    app.get('/admin', requireAuth, requireRole('admin'), (_req, res) => res.sendStatus(200));
    const server = app.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const login = (body) => fetch(base + '/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const credentials = { email: ' STUDENT@example.com ', password: 'password123' };
    const get = (path, token) => fetch(base + path, {
        headers: token ? { Authorization: 'Bearer ' + token } : {},
    });
    try {
        assert.equal((await login({})).status, 400);
        assert.equal((await login({ ...credentials, password: 'wrong' })).status, 401);
        const success = await login(credentials);
        assert.equal(success.status, 200);
        const data = await success.json();
        assert.equal('password' in data.user, false);
        const payload = jwt.verify(data.token, process.env.JWT_SECRET);
        assert.equal(payload.sub, user._id);
        assert.equal(payload.exp - payload.iat, 3600);
        assert.equal((await get('/protected', data.token)).status, 200);
        assert.equal((await get('/protected')).status, 401);
        assert.equal((await get('/protected', 'invalid')).status, 401);
        const expired = jwt.sign({}, process.env.JWT_SECRET, { subject: user._id, expiresIn: -1 });
        assert.equal((await get('/protected', expired)).status, 401);
        const forged = jwt.sign({}, 'different-secret', { subject: user._id });
        assert.equal((await get('/protected', forged)).status, 401);
        assert.equal((await get('/admin', data.token)).status, 403);
        user.role = 'admin';
        assert.equal((await get('/admin', data.token)).status, 200);
        user.isBlocked = true;
        assert.equal((await login(credentials)).status, 403);
        assert.equal((await get('/protected', data.token)).status, 403);
        user = null;
        assert.equal((await login(credentials)).status, 401);
        assert.equal((await get('/protected', data.token)).status, 401);
        databaseFailure = true;
        assert.equal((await get('/protected', data.token)).status, 500);
        console.log('Login, JWT, blocking, and role checks passed. No Atlas writes.');
    } finally {
        User.findOne = originalFindOne;
        User.findById = originalFindById;
        await new Promise(resolve => server.close(resolve));
    }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
