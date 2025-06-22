import { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';

function getToken() {
  return localStorage.getItem('token');
}

export default function EmployeeDashboard({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/employees', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) throw new Error('Session expired. Please login again.');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('login')) onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (emp) => {
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(emp),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to create');
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setShowForm(true);
  };

  const handleUpdate = async (emp) => {
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/employees/${editEmployee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(emp),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to update');
      setShowForm(false);
      setEditEmployee(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete employee ${emp.name}?`)) return;
    setError('');
    try {
      const res = await fetch(`/api/employees/${emp._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to delete');
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Employee Management</h1>
        <button onClick={handleLogout} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 font-semibold">Logout</button>
      </div>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      {showForm ? (
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">{editEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
          <EmployeeForm
            initialData={editEmployee}
            onSubmit={editEmployee ? handleUpdate : handleCreate}
            loading={formLoading}
            submitLabel={editEmployee ? 'Update' : 'Create'}
          />
          <button onClick={() => { setShowForm(false); setEditEmployee(null); }} className="mt-4 text-blue-700 hover:underline">Cancel</button>
        </div>
      ) : (
        <div className="mb-8">
          <button onClick={() => setShowForm(true)} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 font-semibold">Add Employee</button>
        </div>
      )}
      {loading ? (
        <div className="text-center text-blue-700">Loading employees...</div>
      ) : (
        <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
} 