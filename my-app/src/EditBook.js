import React, { useState, useEffect } from 'react';

function EditBook({ bookToEdit, saveChanges, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');

  // Initialize form fields with bookToEdit data when it changes
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
      setGenre(bookToEdit.genre || '');
      setCondition(bookToEdit.condition || '');
      setStatus(bookToEdit.status || 'Available');
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !genre || !condition) {
      alert('Please fill out all fields before saving.');
      return;
    }
    saveChanges({
      ...bookToEdit,
      title,
      author,
      genre,
      condition,
      status,
    });
  };

  if (!bookToEdit) {
    return <p>No book selected for editing.</p>;
  }

  return (
    <div className="edit-book-container">
      <h3>Edit Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group widthInput">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group widthInput">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
          />
        </div>
        <div className="form-group widthInput">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter book genre"
          />
        </div>
        <div className="form-group widthInput">
          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter book condition"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <button type="button" onClick={cancelEdit} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;
