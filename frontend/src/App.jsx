// frontend/src/App.jsx (FINAL Working Structure)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddEditBookPage from './pages/AddEditBookPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50"> 
                <Header /> 
                
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<LandingPage />} exact /> 
                        <Route path="/home" element={<BookListPage />} /> 
                        <Route path="/book/:id" element={<BookDetailsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/add-book" element={<AddEditBookPage />} />
                        <Route path="/edit-book/:id" element={<AddEditBookPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;