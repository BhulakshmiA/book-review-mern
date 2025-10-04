// frontend/src/pages/AddEditBookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AddEditBookPage = () => {
    const { id } = useParams(); // Get book ID from URL for editing
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    const isEditMode = !!id;
    const [formData, setFormData] = useState({ 
        title: '', author: '', description: '', genre: '', publishedYear: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect unauthorized users
            return;
        }

        if (isEditMode) {
            // Fetch existing book data for editing
            const fetchBook = async () => {
                try {
                    // Use a regular Axios instance to avoid token error during fetching if book was added by another user
                    const { data } = await api.get(`/books/${id}`); 
                    setFormData({
                        title: data.title,
                        author: data.author,
                        description: data.description,
                        genre: data.genre,
                        publishedYear: data.publishedYear,
                    });
                } catch (err) {
                    setMessage('Error loading book data for editing.');
                }
            };
            fetchBook();
        }
    }, [id, isEditMode, isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const method = isEditMode ? 'put' : 'post';
        const url = isEditMode ? `/books/${id}` : '/books';

        try {
            await api[method](url, {
                ...formData,
                publishedYear: parseInt(formData.publishedYear), // Ensure year is a number
            });

            setMessage(`Book ${isEditMode ? 'updated' : 'added'} successfully!`);
            setTimeout(() => navigate('/'), 1500); // Redirect to home
        } catch (error) {
            // 401 Unauthorized happens if user tries to edit a book they didn't create
            setMessage(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} book. Check if you are the creator.`);
        }
    };

    if (!isAuthenticated) return null; // Show nothing while redirecting

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h2 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                <input type="text" id="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border" />
                <input type="text" id="author" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full p-2 border" />
                <textarea id="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border"></textarea>
                <input type="text" id="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required className="w-full p-2 border" />
                <input type="number" id="publishedYear" placeholder="Published Year" value={formData.publishedYear} onChange={handleChange} required className="w-full p-2 border" />
                
                <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                    {isEditMode ? 'Update Book' : 'Submit Book'}
                </button>
            </form>
            
            {message && <p className={`mt-4 text-center ${message.includes('SUCCESS') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
        </div>
    );
};

export default AddEditBookPage;