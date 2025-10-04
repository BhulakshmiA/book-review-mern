// frontend/src/pages/BookDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewItem from '../components/ReviewItem'; // Component to be created next

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Review form state
    const [reviewFormData, setReviewFormData] = useState({ rating: 5, reviewText: '' });
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [existingReviewId, setExistingReviewId] = useState(null);
    const [reviewMessage, setReviewMessage] = useState('');

    const fetchBookData = async () => {
        setLoading(true);
        try {
            // GET /api/books/:id - fetches book, average rating, and all reviews
            const { data } = await api.get(`/books/${id}`);
            setBook(data);
            setReviews(data.reviews || []);
            setAverageRating(data.averageRating);
            
            // Check if the current user has already reviewed this book
            const userReview = data.reviews?.find(r => r.user?._id === user?._id);
            if (userReview) {
                setReviewFormData({ rating: userReview.rating, reviewText: userReview.reviewText });
                setIsEditingReview(true);
                setExistingReviewId(userReview._id);
            } else {
                setReviewFormData({ rating: 5, reviewText: '' }); // Reset form for new review
                setIsEditingReview(false);
                setExistingReviewId(null);
            }
        } catch (err) {
            setError('Failed to load book or reviews.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookData();
    }, [id, user]); // Refetch when book ID or user changes

    const handleReviewChange = (e) => {
        const { id, value } = e.target;
        setReviewFormData({ ...reviewFormData, [id]: id === 'rating' ? parseInt(value) : value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewMessage('');
        if (!isAuthenticated) return setReviewMessage('You must be logged in to review.');

        try {
            const method = isEditingReview ? 'put' : 'post';
            const url = isEditingReview ? `/reviews/${existingReviewId}` : `/reviews/${id}`;
            
            await api[method](url, reviewFormData);

            setReviewMessage(`Review successfully ${isEditingReview ? 'updated' : 'added'}!`);
            fetchBookData(); // Reload data to show the new/updated review
        } catch (error) {
            setReviewMessage(error.response?.data?.message || 'Review submission failed.');
        }
    };

    const handleDeleteBook = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.delete(`/books/${id}`);
                alert('Book deleted successfully!');
                navigate('/'); // Go back to the book list
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to delete book.');
            }
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!book) return <div className="text-center mt-8">Book not found.</div>;

    // Check if the current user is the book creator
    const isBookCreator = book.addedBy?._id === user?._id;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-indigo-700 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-700">by {book.author} ({book.publishedYear})</p>
            <p className="text-lg text-yellow-600 mt-2">
                Average Rating: 
                <span className="font-bold ml-1">{averageRating.toFixed(1)} / 5</span> 
                ({reviews.length} reviews)
            </p>

            {/* Book Management Buttons (only for creator) */}
            {isBookCreator && (
                <div className="mt-4 space-x-3">
                    <Link to={`/edit-book/${book._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit Book
                    </Link>
                    <button onClick={handleDeleteBook} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Delete Book
                    </button>
                </div>
            )}
            
            <p className="mt-6 text-gray-800">{book.description}</p>
            <hr className="my-8" />

            {/* Review Submission Form */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    {isEditingReview ? 'Edit Your Review' : 'Add Your Review'}
                </h2>
                {isAuthenticated ? (
                    <form onSubmit={handleReviewSubmit} className="space-y-3 bg-gray-100 p-4 rounded shadow">
                        <label htmlFor="rating" className="block font-medium">Rating (1-5 Stars):</label>
                        <input type="number" id="rating" min="1" max="5" value={reviewFormData.rating} onChange={handleReviewChange} required className="p-2 border rounded w-full md:w-1/4" />

                        <textarea id="reviewText" placeholder="Write your review..." value={reviewFormData.reviewText} onChange={handleReviewChange} required className="w-full p-2 border rounded" rows="4"></textarea>
                        
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            {isEditingReview ? 'Update Review' : 'Submit Review'}
                        </button>
                        {reviewMessage && <p className={`mt-2 ${reviewMessage.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{reviewMessage}</p>}
                    </form>
                ) : (
                    <p className="text-red-500">Please <Link to="/login" className="underline">log in</Link> to add a review.</p>
                )}
            </div>

            {/* Review List */}
            <h2 className="text-2xl font-semibold mb-4">All Reviews ({reviews.length})</h2>
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewItem 
                            key={review._id} 
                            review={review} 
                            onReviewAction={fetchBookData} // Pass callback to reload data after delete
                            currentUserId={user?._id}
                        />
                    ))
                ) : (
                    <p>No reviews yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default BookDetailsPage;