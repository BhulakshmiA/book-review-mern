import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center text-sm mt-8">
            <div className="container mx-auto">
                © {new Date().getFullYear()} Book Review Platform | Built with MERN Stack
            </div>
        </footer>
    );
};

export default Footer;