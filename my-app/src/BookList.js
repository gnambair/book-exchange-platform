import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './styles.css';

function BookList({ books, editBook, deleteBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    editBook(id); // Set the book to be edited
    navigate(`/edit-book/${id}`); // Navigate to the edit page
  };

  return (
    <div className="book-list-container">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {filteredBooks.length === 0 ? (
        <p className="no-books-message">No books match your search.</p>
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-item BookListContainer">
              <div className="BookListContainer">
                <h4 className="book-title paddingBookList">{book.title}</h4>
                <p> | </p>
                <p className="book-author paddingBookList">Author: {book.author}</p>
                <p> | </p>
                <p className="book-genre paddingBookList">Genre: {book.genre}</p>
                <p> | </p>
                <p className="book-condition paddingBookList">Condition: {book.condition}</p>
                <p> | </p>
                <p className="book-status paddingBookList">Status: {book.status}</p>
                <p> | </p>
              </div>
              <div className="book-actions">
                <button
                  className="BookListEditCta"
                  onClick={() => handleEdit(book.id)} // Navigate to edit page
                >
                  Edit
                </button>
                <button
                  className="BookListDeleteCta"
                  onClick={() => deleteBook(book.id)} // Delete the book
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
