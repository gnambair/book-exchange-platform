const express = require('express');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate the user
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied: No token provided' });
  }

  try {
    // Extract the token from the Authorization header (Bearer token format)
    const tokenWithoutBearer = token.split(' ')[1];  // Assumes the format is 'Bearer <token>'
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded.userId; // Assign user ID from token to request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization denied: Invalid token' });
  }
};

// Add Book Route
router.post('/', authMiddleware, async (req, res) => {
  const { title, author, genre, condition, status } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      condition,
      status,
      user: req.user  // Associate the book with the authenticated user
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error while adding book' });
  }
});

// Get Books Route (for logged-in users)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user }); // Fetch books that belong to the authenticated user
    res.json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ message: 'Server error while retrieving books' });
  }
});

// Update Book Route
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, author, genre, condition, status } = req.body;

  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if the logged-in user is the owner of the book
    if (book.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }

    // Update the book details
    book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, condition, status },
      { new: true }  // Return the updated document
    );

    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error while updating book' });
  }
});

// Delete Book Route
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if the logged-in user is the owner of the book
    if (book.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }

    await Book.findByIdAndDelete(req.params.id); // Delete the book from the database
    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
});

// Search Books Route
router.get('/search', authMiddleware, async (req, res) => {
  const { title, author, genre, status } = req.query;
  const searchCriteria = { user: req.user };

  // Apply filters based on query parameters
  if (title) searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive
  if (author) searchCriteria.author = { $regex: author, $options: 'i' };
  if (genre) searchCriteria.genre = genre;
  if (status) searchCriteria.status = status;

  try {
    const books = await Book.find(searchCriteria);
    res.json(books);
  } catch (error) {
    console.error('Error searching for books:', error);
    res.status(500).json({ message: 'Server error while searching for books' });
  }
});

module.exports = router;
