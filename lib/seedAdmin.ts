import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';
import dbConnect from './mongodb';

export async function seedAdmin() {
  await dbConnect();

  const existing = await Admin.findOne({ email: 'admin@admin.com' });
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  await Admin.create({
    username: 'admin',
    email: 'admin@admin.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log('Dummy admin user created: admin@admin.com / Admin@123');
} 