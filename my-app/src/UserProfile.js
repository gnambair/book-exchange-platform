import React from 'react';
import './UserProfile.css';

function UserProfile({ books, currentUserId }) {
  // Filter books belonging to the logged-in user
  const userBooks = books.filter(book => book.userId === currentUserId);

  return (
    <div className="profile-page">
      <h2>Your Book Listings</h2>
      {userBooks.length > 0 ? (
        <div className="user-books-grid">
          {userBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Condition:</strong> {book.condition}</p>
              <p><strong>Availability:</strong> {book.availability}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't added any books yet.</p>
      )}
    </div>
  );
}

export default UserProfile;
