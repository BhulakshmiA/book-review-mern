// frontend/src/pages/BookListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext'; 

const BookListPage = () => {
    const { isAuthenticated } = useAuth(); 
    
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async (pageNumber = 1) => {
        setLoading(true);
        setError(null);
        try {
            if (!api || typeof api.get !== 'function') {
                 throw new Error("API service not loaded correctly.");
            }
            
            // Fetching logic for the simple book list (no search/sort)
            const { data } = await api.get(`/books?pageNumber=${pageNumber}`);
            
            if (data && data.books) {
                setBooks(data.books);
                setPage(data.page || 1);
                setPages(data.pages || 1); 
            }
        } catch (err) {
            console.error("Error fetching books:", err);
            setError(`Failed to fetch books. Check API connection (port 5000). Details: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (api) {
            fetchBooks(page);
        }
    }, [page]);

    // Pagination Handlers
    const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setPage((prev) => Math.min(pages, prev + 1));
    
    // NOTE: HomeBanner is removed as LandingPage handles the root route

    if (loading) return <div className="text-center mt-8 text-xl text-indigo-700">Loading books...</div>;
    if (error) return <div className="text-center mt-8 text-xl text-red-600 font-bold">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">All Books</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.length > 0 ? (
                    books.map((book) => (
                        <BookCard key={book._id} book={book} /> 
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">
                        No books found. {isAuthenticated && <Link to="/add-book" className="text-indigo-600 underline">Add the first one!</Link>}
                    </p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-4">
                <button 
                    onClick={handlePrev} 
                    disabled={page === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:text-gray-200 transition"
                >
                    Previous
                </button>
                <span className="py-2 font-medium">Page {page} of {pages}</span>
                <button 
                    onClick={handleNext} 
                    disabled={page === pages}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:text-gray-200 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookListPage;