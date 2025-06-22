import { useState, useEffect } from 'react';

export default function EmployeeForm({ initialData = {}, onSubmit, loading, submitLabel }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({
      name: initialData.name || '',
      email: initialData.email || '',
      position: initialData.position || '',
      department: initialData.department || '',
      salary: initialData.salary || ''
    });
  }, [initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.position || !form.department || !form.salary) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email address.');
      return;
    }
    if (isNaN(form.salary) || Number(form.salary) < 0) {
      setError('Salary must be a positive number.');
      return;
    }
    onSubmit({ ...form, salary: Number(form.salary) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div>
        <label className="block mb-1 text-gray-700">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required type="email" />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Position</label>
        <input name="position" value={form.position} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Department</label>
        <input name="department" value={form.department} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Salary</label>
        <input name="salary" value={form.salary} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required type="number" min="0" />
      </div>
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition font-semibold" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
} 