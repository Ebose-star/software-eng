import React, { useState, useEffect } from 'react';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
  // Fetch initial list of employees from server
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data));
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.name);
  }

  const handleValueChange = (event) => {
    setValue(event.target.value);
  }

  const handleAddEmployee = () => {
    const newEmployee = { name, value };
        // Make POST request to server to add new employee
    fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    })
      .then(response => response.json())
      .then(data => setEmployees([...employees, data]))
      .catch(error => console.error(error));
    setName('');
    setValue(0);
  }

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>{employee.name} - {employee.value}</li>
        ))}
      </ul>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input type="number" id="value" value={value} onChange={handleValueChange} />
      </div>
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
}

export default EmployeeList;
