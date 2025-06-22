const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_crud';

const employees = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 90000,
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 105000,
  },
  {
    name: 'Carol Lee',
    email: 'carol.lee@example.com',
    position: 'HR Specialist',
    department: 'HR',
    salary: 70000,
  },
  {
    name: 'David Kim',
    email: 'david.kim@example.com',
    position: 'Designer',
    department: 'Design',
    salary: 80000,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Employee.deleteMany({});
    await Employee.insertMany(employees);
    console.log('Employee data seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed(); 