// frontend/src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            // Redirect logged-in users directly to the main app view
            window.location.href = '/home'; 
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return null; 
    }

    return (
        // Use standard Tailwind classes for stability
        <div className="min-h-screen flex items-center justify-center p-0 md:p-8 bg-gray-100">
            <div className="flex w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden bg-white">

                {/* Left Column: Promotion and Text */}
                <div className="w-full md:w-3/5 p-12 lg:p-16 bg-indigo-700 text-white"> 
                    <h1 className="text-5xl font-extrabold mb-4">
                        Find Your Next Literary Obsession
                    </h1>
                    <p className="text-xl opacity-90 mb-10">
                        Join the community to track books you've read, discover new titles, and share genuine reviews.
                    </p>

                    {/* Action Block (Login/Register buttons) */}
                    <div className="bg-gray-900 p-8 rounded-lg shadow-xl"> 
                        <h3 className="text-2xl font-semibold mb-6">
                            Start Your Journey Now
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Login Button */}
                            <Link 
                                to="/login" 
                                className="w-full block text-center bg-yellow-400 text-gray-900 p-3 rounded font-bold text-lg hover:bg-yellow-300 transition duration-300 shadow-lg"
                            >
                                LOGIN TO YOUR ACCOUNT
                            </Link>
                            
                            {/* Register Button */}
                            <Link 
                                to="/signup" 
                                className="w-full block text-center bg-gray-100 text-indigo-900 p-3 rounded font-bold text-lg hover:bg-white transition duration-300 shadow-lg"
                            >
                                CREATE FREE ACCOUNT
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Steps (Ensure this column renders the step numbers) */}
                <div className="hidden md:flex md:w-2/5 items-center justify-center p-10 bg-white">
                    <div className="text-gray-800 text-center p-10">
                        <h3 className="text-2xl font-bold mb-6">How it Works:</h3>
                        <div className="space-y-6 text-left">
                            <div className="flex items-center space-x-3">
                                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
                                <span className="text-lg">Register or Log in.</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
                                <span className="text-lg">Find new books to review.</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
                                <span className="text-lg">Connect with other readers!</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;