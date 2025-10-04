import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    // Reference to the book being reviewed
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
    },
    // Reference to the user who wrote the review
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;