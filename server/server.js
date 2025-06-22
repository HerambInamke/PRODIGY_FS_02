const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const Admin = require('./models/Admin');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employee'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://heramb15012006:coco1501@cluster0.vye32j0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Create default admin if not exists
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'admin123';
    let admin = await Admin.findOne({ username: adminUser });
    if (!admin) {
      const hashed = await bcrypt.hash(adminPass, 10);
      await Admin.create({ username: adminUser, password: hashed });
      console.log('Default admin created:', adminUser);
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
