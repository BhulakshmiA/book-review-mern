import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';

// @desc    Add a review to a book
// @route   POST /api/reviews/:bookId
// @access  Private
const addReview = asyncHandler(async (req, res) => {
    const { rating, reviewText } = req.body;
    const bookId = req.params.bookId;
    const userId = req.user._id;

    const book = await Book.findById(bookId);

    if (book) {
        // 1. Check if user already reviewed this book
        const alreadyReviewed = await Review.findOne({ book: bookId, user: userId });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Book already reviewed by this user');
        }

        const review = new Review({
            book: bookId,
            user: userId,
            rating,
            reviewText,
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Only review creator)
const updateReview = asyncHandler(async (req, res) => {
    const { rating, reviewText } = req.body;

    const review = await Review.findById(req.params.id);

    if (review) {
        // Check if the logged-in user is the one who wrote the review
        if (review.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this review');
        }

        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Only review creator)
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        // Check if the logged-in user is the one who wrote the review
        if (review.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this review');
        }

        await Review.deleteOne({ _id: req.params.id });
        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

export {
    addReview,
    updateReview,
    deleteReview,
};