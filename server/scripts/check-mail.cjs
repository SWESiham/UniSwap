require('dotenv').config({path:require('node:path').join(__dirname,'../.env'),quiet:true});
const { createMailTransport } = require('../src/utils/mail.ts');

(async () => {
    const transport = createMailTransport();
    try {
        await transport.verify();
        console.log('SMTP connection and authentication succeeded.');
        if (process.argv.includes('--send')) {
            if (!process.env.SMTP_USER) throw new Error('SMTP_USER is required for self-test');
            const result = await transport.sendMail({
                from: process.env.MAIL_FROM,
                to: process.env.SMTP_USER,
                subject: 'UniSwap email test',
                text: 'This is a test from your local UniSwap server. No action is required.',
            });
            if (!result.accepted?.length || result.rejected?.length) throw new Error('Message was not accepted');
            console.log('Test email accepted by SMTP. Check your Inbox and Spam to confirm delivery.');
        }
    } finally { transport.close(); }
})().catch(error => {
    console.error(error.code === 'EAUTH' ? 'Gmail rejected the credentials. Check the App Password.' :
        error.message?.startsWith('SMTP_PASS') ? 'SMTP_PASS is missing. Add your App Password to server/.env.' :
        'Mail check failed. Check SMTP settings and internet connection.');
    process.exitCode = 1;
});
