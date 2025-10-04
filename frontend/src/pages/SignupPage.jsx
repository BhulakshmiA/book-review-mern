// frontend/src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/users', formData); // POST /api/users
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Register Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500">Login here</a></p>
        </div>
    );
};

export default SignupPage;