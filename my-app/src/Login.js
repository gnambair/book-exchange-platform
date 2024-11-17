import React, { useState } from 'react';
import './Login.css';  // Import the stylesheet
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');  // Reset error message on form submit

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password })  // Ensure this matches your backend login requirements
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        alert('Login successful!');
        onLogin(); // Call the parent function to set authenticated state
        navigate('/'); // Redirect to the home page after successful login
      } else {
        // Login failed
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="container">
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
