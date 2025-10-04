import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    // Link the book to the user who added it
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);
export default Book;