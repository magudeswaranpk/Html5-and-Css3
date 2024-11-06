import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';  

const CustomerList = ({ setLoggedIn }) => {
    const [customers, setCustomers] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editCustomer, setEditCustomer] = useState({ firstName: '', lastName: '', position: '', department: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        setCustomers(storedCustomers);
    }, []);

    const handleDeleteCustomer = (index) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setLoggedIn(false);
    };

    const handleAddEmployee = () => {
        navigate('/add-employee');
    };

    const handleEditCustomer = (index) => {
        setEditIndex(index);
        setEditCustomer(customers[index]);
    };

    const handleSaveCustomer = () => {
        const updatedCustomers = [...customers];
        updatedCustomers[editIndex] = editCustomer;
        setCustomers(updatedCustomers);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        setEditIndex(-1);
        setEditCustomer({ firstName: '', lastName: '', position: '', department: '' });
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <h2>Employee List</h2>
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
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            {editIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCustomer.firstName}
                                            onChange={(e) => setEditCustomer({ ...editCustomer, firstName: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCustomer.lastName}
                                            onChange={(e) => setEditCustomer({ ...editCustomer, lastName: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCustomer.position}
                                            onChange={(e) => setEditCustomer({ ...editCustomer, position: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCustomer.department}
                                            onChange={(e) => setEditCustomer({ ...editCustomer, department: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveCustomer}>Save</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.position}</td>
                                    <td>{customer.department}</td>
                                    <td>
                                        <button onClick={() => handleEditCustomer(index)}>Edit</button>
                                        <button onClick={() => handleDeleteCustomer(index)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-employee-button" onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default CustomerList;
