const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });
const mongoose = require('mongoose');

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing in server/.env');
      process.exitCode = 1;
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    await mongoose.connection.db.admin().ping();
    console.log('Connected successfully');
  } catch (error) {
    if (/auth|credential|password/i.test(error.message)) {
      console.error('Authentication failed: check the database username and password.');
    } else {
      console.error('Connection failed. Check the cluster address, network access, and connection settings.');
      console.error('Error type:', error.name, 'Code:', error.code ?? 'none');
    }
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
