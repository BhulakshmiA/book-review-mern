import express from 'express';
const router = express.Router();
import {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public routes for viewing books
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected routes for management
router.post('/', protect, addBook);
router.route('/:id')
    .put(protect, updateBook)
    .delete(protect, deleteBook);

export default router;