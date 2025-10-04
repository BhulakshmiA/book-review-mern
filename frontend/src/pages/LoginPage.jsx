// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await api.post('/users/login', formData); // POST /api/users/login
            
            // Extract token and user details from the response
            const { token, _id, name, email } = res.data; 

            // Call global login function to store token and update state
            login(token, { _id, name, email }); 

            setMessage('Login successful! Redirecting to home...');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed. Invalid credentials.');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Login
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            <p className="mt-4 text-center">Don't have an account? <a href="/signup" className="text-blue-500">Register now</a></p>
        </div>
    );
};

export default LoginPage;