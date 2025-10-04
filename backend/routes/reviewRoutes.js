import express from 'express';
const router = express.Router();
import {
    addReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route to add a review (uses bookId in URL)
router.post('/:bookId', protect, addReview);

// Routes for managing a specific review (uses reviewId in URL)
router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

export default router;