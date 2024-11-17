import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AddBook from './AddBook';
import BookList from './BookList';
import EditBook from './EditBook';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const location = useLocation();

  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, { ...newBook, id: Date.now() }]);
    setShowAddBookModal(false);
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const editBook = (id) => {
    const book = books.find((book) => book.id === id);
    setBookToEdit(book);
  };

  const saveChanges = (updatedBook) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setBookToEdit(null);
  };

  const cancelEdit = () => {
    setBookToEdit(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    alert('Logged out successfully!');
  };

  // Check if the current route is for Login or Register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {/* Conditionally render the navbar */}
      {!isAuthPage && (
        <nav className="navbarmain">
          {isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="#" onClick={() => setShowAddBookModal(true)}>Add Book</Link>
              <Link to="/book-list">Book List</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      )}

      {showAddBookModal && (
        <div className="modal-overlay">
          <AddBook addBook={addBook} closeModal={() => setShowAddBookModal(false)} />
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div>
                <h2>Welcome to the Book Exchange</h2>
                <Link to="/book-list">Go to Book List</Link>
              </div>
            ) : (
              <div>
                <h2>Please log in or register to access the platform.</h2>
                {/* <Link to="/login">Login</Link> | <Link to="/register">Register</Link> */}
              </div>
            )
          }
        />
        <Route
          path="/book-list"
          element={
            isAuthenticated ? (
              <div className="book-page">
                <BookList books={books} editBook={editBook} deleteBook={deleteBook} />
              </div>
            ) : (
              <div>
                <h2>Please Register if you want to explore more!</h2>
                <Link to="/login">Go to Login</Link>
              </div>
            )
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            isAuthenticated ? (
              <EditBook bookToEdit={bookToEdit} saveChanges={saveChanges} cancelEdit={cancelEdit} />
            ) : (
              <div>
                <h2>Unauthorized Access</h2>
                <Link to="/login">Go to Login</Link>
              </div>
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
