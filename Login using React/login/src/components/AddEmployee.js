import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';  

const AddEmployee = () => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        position: '',
        department: ''
    });

    const navigate = useNavigate();

    const handleAddEmployee = () => {
        const storedEmployees = JSON.parse(localStorage.getItem('customers')) || [];
        const updatedEmployees = [...storedEmployees, newEmployee];
        localStorage.setItem('customers', JSON.stringify(updatedEmployees));
        navigate('/');
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <input
                type="text"
                placeholder="First Name"
                value={newEmployee.firstName}
                onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={newEmployee.lastName}
                onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            />
            <input
                type="text"
                placeholder="Department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default AddEmployee;
