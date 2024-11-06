import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CustomerList from './components/CustomerList';
import AddEmployee from './components/AddEmployee';
import ForgotPassword from './components/Forgotpassword';
import About from './components/About';
import Help from './components/Help';
import './components/styles.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('username'));

    return (
        <Router>
            <div className="container">
                {loggedIn ? (
                    <Routes>
                        <Route path="/" element={<CustomerList setLoggedIn={setLoggedIn} />} />
                        <Route path="/add-employee" element={<AddEmployee />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;
