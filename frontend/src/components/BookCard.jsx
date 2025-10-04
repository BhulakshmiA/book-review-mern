// frontend/src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    return (
        <div 
            className="border border-gray-200 p-6 rounded-xl shadow-lg bg-white 
                       hover:shadow-2xl hover:scale-[1.02] transform transition duration-300 ease-in-out" 
        >
            <h3 className="text-2xl font-semibold text-blue-800">{book.title}</h3>
            <p className="text-gray-600 mt-2">by {book.author}</p>
            <p className="text-sm text-gray-500 italic">Genre: {book.genre} | Year: {book.publishedYear}</p>
            <Link 
                to={`/book/${book._id}`} 
                className="mt-4 inline-block text-base text-green-600 font-medium hover:underline hover:text-green-700 transition duration-150"
            >
                View Details & Reviews →
            </Link>
        </div>
    );
};

export default BookCard; // <--- This 'default' is the fix!