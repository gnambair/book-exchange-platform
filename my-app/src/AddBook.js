import React, { useState } from 'react';
import './AddBook.css';

function AddBook({ addBook, closeModal }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [availability, setAvailability] = useState('Available');
  const [location, setLocation] = useState(''); // New location field
  console.log('closeModal:', closeModal); // Check that closeModal is correctly received

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, condition, status: availability, location };

    addBook(newBook); // Add the new book
    setTitle(''); // Reset input fields after adding the book
    setAuthor('');
    setGenre('');
    setCondition('');
    setAvailability('Available');
    setLocation(''); // Reset location input

    closeModal(); // Close the modal after adding the book
  };

  return (
    <div className="add-book-modal">
      <div className="modal-content">
        <h2 className="modal-title">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="add-book-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Condition:</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Availability:</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
              className="form-select"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Add Book</button>
            <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
