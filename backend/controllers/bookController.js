import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import Review from '../models/reviewModel.js';
import mongoose from 'mongoose';

// @desc    Get all books with pagination (5 books per page)
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    // Optional: Search/Filter (Bonus Feature)
    const keyword = req.query.keyword ? {
        $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { author: { $regex: req.query.keyword, $options: 'i' } },
        ]
    } : {};

    const count = await Book.countDocuments({ ...keyword });
    const books = await Book.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single book by ID, including average rating and reviews
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');

    if (book) {
        // Find all reviews for this book
        const reviews = await Review.find({ book: book._id }).populate('user', 'name');

        // Calculate Average Rating
        const averageRating = reviews.length > 0
            ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
            : 0;

        res.json({
            ...book._doc, // spread the book document fields
            reviews,
            averageRating: parseFloat(averageRating.toFixed(2)),
        });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
const addBook = asyncHandler(async (req, res) => {
    const { title, author, description, genre, publishedYear } = req.body;

    const book = new Book({
        title,
        author,
        description,
        genre,
        publishedYear,
        addedBy: req.user._id, // User ID is attached via protect middleware
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (Only book creator)
const updateBook = asyncHandler(async (req, res) => {
    const { title, author, description, genre, publishedYear } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        // Check if the logged-in user is the one who added the book
        if (book.addedBy.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this book');
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.genre = genre || book.genre;
        book.publishedYear = publishedYear || book.publishedYear;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (Only book creator)
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        // Check if the logged-in user is the one who added the book
        if (book.addedBy.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this book');
        }

        // OPTIONAL: Also delete all related reviews (good practice)
        await Review.deleteMany({ book: req.params.id });

        await Book.deleteOne({ _id: req.params.id });
        res.json({ message: 'Book and associated reviews removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

export {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};