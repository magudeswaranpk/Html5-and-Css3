import React, { useState, useEffect } from 'react';
import './Table-Card.css';
import EmployeeForm from './Employeeform';
 
const EmployeeList = () => {
  const [view, setView] = useState('table');
  const [employees, setEmployees] = useState([]);
  const [warning, setWarning] = useState('');
  const [editingEmployee,setEditingEmployee]=useState(null);
  const [editingIndex, setEditingIndex]=useState(null);
  const [addEdit,setAddEdit]=useState(false);
 
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);
 
  const handleAddEmployee = (employee) => {
    try{
        setAddEdit(true);
        const updatedEmployees = [...employees, employee];
        localStorage.setItem('employees',JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        setWarning('');
        window.alert("employee Added successfully")
        setAddEdit(false);
       
    }
    catch (e) {
        if (e.code === 22){
            setWarning('Local storage is full. unable to add more employees')
        }
    }
  }
  const handleEditEmployee =(employee) =>{
    const updatedEmployees = employees.map((emp,index) =>
      index === editingIndex ? employee : emp
  );
  localStorage.setItem('employees',JSON.stringify(updatedEmployees));
  setEmployees(updatedEmployees);
  setEditingEmployee(null);
  setEditingIndex(null);
  window.alert('employee details updated');
  setAddEdit(false);
  };
 
  const handleEditClick = (index) => {
    setEditingEmployee(employees[index]);
    setEditingIndex(index);
    setAddEdit(true);
  };
 
  const handleDeleteEmployee =(index) => {
    const updatedEmployees = employees.filter((_,i) => i !==index);
    localStorage.setItem('employees',JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };
 
  return (
  <>{addEdit ? (
<div>
    <EmployeeForm
     onAddEmployee={handleAddEmployee}
     onEditEmployee={handleEditEmployee}
     editingEmployee={editingEmployee}
      />
    {warning && <div className="warning">{warning}</div>}
</div>): (
<div>
 <h3>Click here to <u  onClick={handleAddEmployee}>Add Employee</u></h3>
<button onClick={() => setView('table')}>Table View</button>
<button onClick={() => setView('card')}>Card View</button>
 
      {view === 'table' ? (
<table>
<thead>
<tr>
<th>First Name</th>
<th>Last Name</th>
<th>Position</th>
<th>Department</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
            {employees.map((employee, index) => (
<tr key={index}>
<td>{employee.firstname}</td>
<td>{employee.lastname}</td>
<td>{employee.position}</td>
<td>{employee.department}</td>
<td>
    <button onClick={() => handleEditClick(index)}>Edit</button>
    <button onClick={() => handleDeleteEmployee(index)}>Delete</button>
</td>
</tr>
            ))}
</tbody>
</table>
      ) : (
<div className="card-view">
          {employees.map((employee, index) => (
<div className="card" key={index}>
<h3>{employee.firstname} {employee.lastname}</h3>
<p>Position: {employee.position}</p>
<p>Department: {employee.department}</p>
<button onClick={() => handleEditClick(index)}>Edit</button>
<button onClick={() => handleDeleteEmployee(index)}> Delete</button>
</div>
          ))}
</div>
      )}
</div>
)}
</>
  );
};
 
export default EmployeeList;