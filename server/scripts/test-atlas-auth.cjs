require('dotenv').config({quiet:true});
const assert=require('node:assert/strict');
const mongoose=require('mongoose');
const {randomUUID}=require('node:crypto');
const User=require('../src/models/User.ts').default;
const {registerUser,loginUser}=require('../src/services/auth.service.ts');
const {getUserProfile,updateUserProfile}=require('../src/services/user.service.ts');
const email='integration-'+randomUUID()+'@example.com';
(async()=>{try{
await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:15000});
const user=await registerUser({name:'Integration test',email,password:randomUUID()});
assert.equal(user.role,'user');
assert.equal('password' in user,false);
// Separate test account password remains only in memory.
const password=randomUUID();
const bcrypt=require('bcryptjs');
await User.updateOne({_id:user.id,email},{$set:{password:await bcrypt.hash(password,12)}});
const login=await loginUser({email,password});
assert.ok(login.token);
const profile=await getUserProfile(user.id);
assert.equal(profile.email,email);
assert.equal(profile.password,undefined);
const updated=await updateUserProfile(user.id,{name:'Updated student',faculty:'Engineering'}); assert.equal(updated.name,'Updated student'); assert.equal(updated.password,undefined); console.log('Atlas registration, login, profile read and update passed.');
}finally{if(mongoose.connection.readyState===1){await User.deleteOne({email});console.log('Exact temporary test account removed.');}await mongoose.disconnect();}})().catch(e=>{console.error(e.name, String(e.message).replace(/mongodb[^ ]+/g,"[redacted]"));process.exitCode=1;});
