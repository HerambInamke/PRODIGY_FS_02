const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single employee
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create employee
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;
    const employee = new Employee({ name, email, position, department, salary });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update employee
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, position, department, salary } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, department, salary },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 