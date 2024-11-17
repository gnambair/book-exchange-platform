import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Function to handle API requests with an optional token
const apiClient = (token = null) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

// Auth API calls
export const registerUser = async (userData) => {
  return await apiClient().post('/auth/register', userData);
};

export const loginUser = async (userData) => {
  return await apiClient().post('/auth/login', userData);
};

// Book API calls
export const addBook = async (bookData, token) => {
  return await apiClient(token).post('/books', bookData);
};

export const getUserBooks = async (token) => {
  return await apiClient(token).get('/books');
};

export const updateBook = async (bookId, bookData, token) => {
  return await apiClient(token).put(`/books/${bookId}`, bookData);
};

export const deleteBook = async (bookId, token) => {
  return await apiClient(token).delete(`/books/${bookId}`);
};
