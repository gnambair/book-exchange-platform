import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (username && password) {
      // Store user data in local storage for simplicity
      localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
      setMessage('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
    } else {
      setMessage('Both fields are required.');
    }
  };

  return (
    <div className="container">
      {message && <p>{message}</p>}
      <form>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default Register;
