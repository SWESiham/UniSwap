# شرح باك إند DEV 1

## الفكرة
الطلب بيمر على Route ثم Controller ثم Service ثم Model.
- Route: عنوان العملية.
- Controller: يراجع البيانات ويحدد الرد.
- Service: ينفذ الشغل مع الداتابيز.
- Model: شكل البيانات وقواعدها.
- Middleware: يفحص التوكن قبل الدخول للمسار المحمي.

## المسارات
كل المسارات تبدأ بـ /api.

| Method | Path | الاستخدام |
|---|---|---|
| POST | /auth/register | حساب عادي: name, email, password، والكلية والقسم اختياريين |
| POST | /auth/login | email, password ويرجع token وuser |
| POST | /auth/admin/login | نفس البيانات لكن الحساب لازم يكون admin |
| POST | /auth/forgot-password | email ويرسل رابط صالح 15 دقيقة |
| POST | /auth/reset-password | token, password |
| PATCH | /auth/change-password | currentPassword, newPassword، يحتاج توكن |
| POST | /auth/logout | إلغاء كل جلسات الحساب، يحتاج توكن |
| GET | /users/me | بيانات حسابك |
| PATCH | /users/me | تعديل name, faculty, department فقط |
| GET | /users/:id | اسم المستخدم وكليته وقسمه وتاريخ الانضمام؛ لا يعرض الإيميل |
| GET | /users/me/dashboard | أعداد الإعلانات والمباع والمفضلة |
| GET | /users/me/listings | إعلاناتك |
| GET | /users/me/sold | المباع حسب حقلي status وisSold الموجودين عند الفريق |
| GET | /users/me/favorites | مفضلتك؛ الإعلان غير المتاح يرجع listing: null |
| GET | /users/me/requests | 501 لحين تنفيذ Request Model من DEV 4 |

القوائم تدعم ?page=1&limit=12، والحد الأقصى 50.
المسارات الخاصة بالحساب تحتاج Authorization: Bearer TOKEN.
مسار /users/register-seller موجود للتوافق مع سهام، ويسجل user عادي يقدر يبيع.
الحظر وفك الحظر وإدارة الأدمن مسؤولية DEV 5، والحماية عندنا تحترم isBlocked فورًا.
لا يوجد تسجيل أدمن عام؛ مسؤول المشروع يجهز حساب admin عبر إدارة موثوقة.

## الباسورد والتوكن ببساطة
bcrypt بيحوّل الباسورد لـhash، ومقارنة الدخول باستخدام compare.
JWT صالح ساعة، فيه رقم المستخدم ورقم إصدار الجلسة tokenVersion.
تغيير الباسورد أو الخروج بيزوّد tokenVersion، فكل التوكنات القديمة تبطل.
استرجاع الباسورد يستخدم رمز عشوائي، نخزن الـhash بتاعه فقط، ويبطل بعد 15 دقيقة أو أول استخدام.
لو طلبين reset وصلوا معًا، التحديث الذري في MongoDB يسمح باستخدام واحد فقط.
طلبات الحسابات محدودة بـ30 طلب في 15 دقيقة لكل IP على هذا السيرفر.

## البريد
ضع SMTP_HOST وSMTP_PORT وSMTP_SECURE وSMTP_USER وSMTP_PASS وMAIL_FROM في server/.env.
CLIENT_URL هو عنوان الفرونت، والرابط يفتح /reset-password?token=...
من غير الإعدادات، forgot-password يرجع 503 بدل الادعاء بإرسال بريد.
رسالة النجاح لا تكشف هل الحساب موجود. فشل التسليم يُسجل بدون بيانات حساسة.
صفحة reset-password في الفرونت ما زالت تحتاج تنفيذًا ضمن شغل الواجهة.

## الاختبار
من داخل server:

```powershell
npx tsc --noEmit
node --import tsx scripts/test-login.cjs
node --import tsx scripts/test-register.cjs
node --import tsx scripts/test-dev1.cjs
```
آخر اختبار يحتاج Atlas: ينشئ حسابًا باسم عشوائي، يختبر API حقيقي، ويحذف نفس الحساب في النهاية.
البريد في الاختبار بديل محلي: لا يرسل رسائل حقيقية.
اختبرنا التسجيل والدخول والأدمن والبروفايل والبيانات العامة والقوائم وتغيير واسترجاع الباسورد وإبطال التوكن.

## حدود الربط الحالية
Request وConversation عند الفريق ملفات فارغة، لذلك لا نخمن شكل بياناتهم.
لوحة المستخدم ترجع requests/chats: null مع unavailable، ومسار طلباتي يرجع 501 بشكل صريح.
بعد وصول الموديلات والـAPIs من DEV 4، نربطها بالمستخدم ونختبر ملكية البيانات.
أخطاء Home والإعلانات في ملفات الفريق لم تُعدل، لذلك نجاح اختبار الباك لا يعني أن واجهة المشروع كلها مكتملة.

## تفعيل Gmail محليًا
إعدادات المرسل موجودة في server/.env. أضف App Password في SMTP_PASS فقط.
لا تضع باسورد Gmail العادي ولا ترفع ملف .env.
من داخل server افحص الاتصال:

```powershell
node --import tsx scripts/check-mail.cjs
```

ولإرسال رسالة اختبار إلى نفس حساب SMTP_USER:

```powershell
node --import tsx scripts/check-mail.cjs --send
```

نجاح الاتصال ليس إثباتًا لوصول الرسالة. راجع Inbox وSpam بعد الإرسال.
بعد تغيير الإعدادات أعد تشغيل السيرفر.
