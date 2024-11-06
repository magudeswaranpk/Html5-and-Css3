import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomerName, setNewCustomerName] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/customers',
        { name: newCustomerName },
        { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
      );
      setNewCustomerName('');
      fetchCustomers();
    } catch (error) {
      console.error('Failed to add customer', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Failed to delete customer', error);
    }
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <form onSubmit={handleAddCustomer}>
        <label>
          Customer Name:
          <input
            type="text"
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Customer</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;


