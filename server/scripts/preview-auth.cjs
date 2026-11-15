// سيرفر لفحص مسارات الحسابات فقط، بدون اتصال بقاعدة البيانات.
// استخدمه لاختبارات Validation فقط؛ مش بيحفظ أو يسجّل دخول حسابات.
const express = require('express');
const authRoutes = require('../src/routes/auth.routes.ts').default;
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(5051, '127.0.0.1', () => console.log('Auth validation preview on port 5051'));
