// frontend/src/components/ReviewItem.jsx
import React from 'react';
import api from '../services/api';

const ReviewItem = ({ review, onReviewAction, currentUserId }) => {
    
    // Check if the logged-in user wrote this review
    const isOwner = review.user?._id === currentUserId;

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your review?')) {
            try {
                // DELETE /api/reviews/:id
                await api.delete(`/reviews/${review._id}`);
                alert('Review deleted successfully!');
                onReviewAction(); // Callback to refresh the book details page
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to delete review.');
            }
        }
    };

    return (
        <div className="border p-4 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-lg font-bold text-yellow-600">Rating: {review.rating} / 5</p>
                    <p className="text-sm text-gray-500">By: {review.user?.name || 'Anonymous'}</p>
                </div>
                {isOwner && (
                    <div className="space-x-2">
                        {/* Note: Edit functionality is handled by the main form, this is only for delete */}
                        <button 
                            onClick={handleDelete}
                            className="text-xs text-red-500 hover:text-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <p className="mt-3 text-gray-700 italic">"{review.reviewText}"</p>
            <p className="text-xs text-gray-400 mt-2">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ReviewItem;