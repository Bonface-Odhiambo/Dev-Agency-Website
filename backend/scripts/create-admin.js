// Script to create an admin user
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import User from '../models/User.js';

async function createAdmin() {
  try {
    console.log('🔧 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Admin details
    const adminData = {
      name: 'Principal Researcher',
      email: 'principalresearcher138@gmail.com',
      password: 'Kx9#mP2$vL8@wN',
      role: 'admin',
      status: 'active',
      email_verified: true,
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminData.email } });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      console.log('🔑 Role:', existingAdmin.role);
      console.log('\nYou can login with:');
      console.log('Email: principalresearcher138@gmail.com');
      console.log('Password: Kx9#mP2$vL8@wN');
      return;
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const password_hash = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: adminData.name,
      email: adminData.email,
      passwordHash: password_hash,
      role: adminData.role,
      status: adminData.status,
      emailVerified: adminData.email_verified,
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Role:', admin.role);
    console.log('🆔 ID:', admin.id);
    console.log('\n🎉 You can now login with:');
    console.log('Email: principalresearcher138@gmail.com');
    console.log('Password: Kx9#mP2$vL8@wN');
    console.log('\n✅ Admin account is ready!\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

createAdmin();
