const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nitin5art';

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);

  const email = 'support@nitin5art.com';
  const username = 'support';
  const plainPassword = 'Nitin9067$#@!';
  const password = await bcrypt.hash(plainPassword, 12);

  // Check if user already exists
  const existing = await Admin.findOne({ email });
  if (existing) {
    await mongoose.disconnect();
    return;
  }

  const admin = new Admin({
    username,
    email,
    password,
    role: 'admin',
  });

  await admin.save();
  await mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 