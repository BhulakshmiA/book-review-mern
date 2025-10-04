// frontend/src/components/Header.jsx (FINAL Functional Version - 'Books' Button Removed)
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isOnLandingPage = location.pathname === '/'; 

    return (
        <header className="bg-gray-900 p-4 text-white shadow-xl sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* App Title Link (This now acts as the Home/Books link) */}
                <Link to="/home" className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-300 transition duration-150">
                    Book Review Platform 📚
                </Link>

                <nav className="space-x-4 flex items-center">
                    
                    {/* Logged In View */}
                    {isAuthenticated ? (
                        <>
                            <span className="text-md text-gray-300">Welcome, {user?.name}!</span>
                            
                            {/* The "Books" button has been successfully removed */}
                            
                            <Link to="/add-book" className="bg-indigo-600 px-4 py-2 rounded font-medium hover:bg-indigo-500 transition duration-200">Add Book</Link>
                            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition duration-200">Logout</button>
                        </>
                    ) : (
                        // Logged Out View
                        !isOnLandingPage && (
                            <>
                                <Link to="/login" className="text-white hover:text-yellow-400 transition duration-150">Login</Link>
                                <Link to="/signup" className="text-white hover:text-yellow-400 transition duration-150">Register</Link>
                            </>
                        )
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;