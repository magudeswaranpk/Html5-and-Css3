
import React, { useEffect, useState } from 'react';
 
const EmployeeForm = ({ onAddEmployee, onEditEmployee, editingEmployee }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  useEffect(()=> {
    if(editingEmployee){
      setFirstName(editingEmployee.firstname);
      setLastName(editingEmployee.lastname)
      setPosition(editingEmployee.position);
      setDepartment(editingEmployee.department);
    }
 
  },[editingEmployee])
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = { firstname,lastname, position, department };
    if(editingEmployee){
      onEditEmployee(employee);
    }
    else{
    onAddEmployee(employee);
    }
    setFirstName('');
    setLastName('')
    setPosition('');
    setDepartment('');
  };
 
  return (
<form className="Employee-Form" onSubmit={handleSubmit}>
<div>
<label>First Name </label>
<input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
</div>
<div>
<label>Last Name </label>
<input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
</div>
 
<div>
<label>Position: </label>
<input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
</div>
<div>
<label>Department: </label>
<input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
</div>
<button type="submit">{editingEmployee? 'Update Employee ':'Add Employee'}</button>
</form>
  );
};
 
export default EmployeeForm;
 
 

 