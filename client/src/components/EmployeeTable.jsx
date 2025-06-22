export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Salary</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">No employees found.</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp._id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4">{emp.name}</td>
                <td className="py-2 px-4">{emp.email}</td>
                <td className="py-2 px-4">{emp.position}</td>
                <td className="py-2 px-4">{emp.department}</td>
                <td className="py-2 px-4">${emp.salary.toLocaleString()}</td>
                <td className="py-2 px-4 space-x-2">
                  <button onClick={() => onEdit(emp)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold">Edit</button>
                  <button onClick={() => onDelete(emp)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 