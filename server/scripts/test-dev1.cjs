// HTTP + Atlas integration. Only uniquely named test users are created/deleted.
require('dotenv').config({quiet:true});
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const mongoose=require('mongoose');
const express=require('express');
const mail=require('nodemailer');
const originalTransport=mail.createTransport;
let resetToken;
mail.createTransport=()=>({sendMail:async message=>{
 resetToken=new URL(message.text.split(' ').at(-1)).searchParams.get('token');
}});
process.env.SMTP_USER='test@example.com'; process.env.SMTP_PASS='test-only-not-a-real-password'; process.env.SMTP_HOST='local-test-only'; process.env.MAIL_FROM='test@example.com'; process.env.CLIENT_URL='http://localhost:5173';
const User=require('../src/models/User.ts').default;
const auth=require('../src/routes/auth.routes.ts').default;
const users=require('../src/routes/user.routes.ts').default;
const email='dev1-test-'+crypto.randomUUID()+'@example.com';
let server;
(async()=>{try{
 await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:15000});
 const app=express();app.use(express.json());app.use('/api/auth',auth);app.use('/api/users',users);
 server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 const base='http://127.0.0.1:'+server.address().port;
 async function request(path,method='GET',body,token,status=200){
  const response=await fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});
  const data=await response.json();assert.equal(response.status,status,JSON.stringify(data));return data;
 }
 const first='Temporary-password-123';const second='New-temporary-password-456';const third='Reset-password-789';
 const created=await request('/auth/register','POST',{name:'Test Student',email,password:first},null,201);
 assert.equal(created.user.password,undefined);
 await request('/auth/register','POST',{name:'Test Student',email,password:first},null,409);
 let login=await request('/auth/login','POST',{email,password:first});let token=login.token;
 await request('/auth/admin/login','POST',{email,password:first},null,403);
 await request('/users/me','GET',null,null,401);
 const me=await request('/users/me','GET',null,token);assert.equal(me.user.email,email);
 const publicUser=await request('/users/'+created.user.id);assert.equal(publicUser.user.email,undefined);
 await request('/users/not-an-id','GET',null,null,400);
 await request('/users/me','PATCH',{role:'admin'},token,400);
 await request('/users/me','PATCH',{name:'Edited name',faculty:'Engineering'},token);
 for(const path of ['dashboard','listings','sold','favorites']) await request('/users/me/'+path,'GET',null,token);
 await request('/users/me/requests','GET',null,token,501);
 await request('/users/me/listings?page=-1','GET',null,token,400);
 await request('/auth/change-password','PATCH',{currentPassword:'wrong',newPassword:second},token,400);
 await request('/auth/change-password','PATCH',{currentPassword:first,newPassword:second},token);
 await request('/users/me','GET',null,token,401);
 await request('/auth/login','POST',{email,password:first},null,401);
 login=await request('/auth/login','POST',{email,password:second});token=login.token;
 await request('/auth/forgot-password','POST',{email});assert.ok(resetToken);
 const stored=await User.findById(created.user.id).select('+resetTokenHash');assert.notEqual(stored.resetTokenHash,resetToken);
 await request('/auth/reset-password','POST',{token:resetToken,password:third});
 await request('/auth/reset-password','POST',{token:resetToken,password:third},null,400);
 await request('/users/me','GET',null,token,401);
 login=await request('/auth/login','POST',{email,password:third});token=login.token;
 await request('/auth/logout','POST',{},token);await request('/users/me','GET',null,token,401);
 await User.updateOne({_id:created.user.id,email},{$set:{role:'admin'}});
 await request('/auth/admin/login','POST',{email,password:third});
 await User.updateOne({_id:created.user.id,email},{$set:{isBlocked:true}});
 await request('/auth/login','POST',{email,password:third},null,403);
 console.log('PASS: registration, login, admin, profile, dashboard, password change/reset, token revocation. Email captured locally; no real email sent.');
}finally{
 if(server)await new Promise(r=>server.close(r));
 if(mongoose.connection.readyState===1)await User.deleteOne({email});
 await mongoose.disconnect();mail.createTransport=originalTransport;
 console.log('Temporary test account cleaned up.');
}})().catch(e=>{console.error(e.message);process.exitCode=1;});
