import React, { useState, useEffect } from 'react';
import './BookList.css';

/**
 * BookList Component
 * 
 * Menampilkan daftar semua buku dari database
 * Menyediakan opsi untuk edit dan hapus buku
 */
function BookList({ onEdit, refreshTrigger }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost/Tugas%20PWEB/backend/getBooks.php');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setBooks(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to load books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost/Tugas%20PWEB/backend/deleteBook.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Book deleted successfully');
        fetchBooks();
      } else {
        throw new Error(result.message || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Library Collection</h2>
      {books.length === 0 ? (
        <p className="no-books">No books found in the library</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <h3>{book.title}</h3>
                <span className="category-badge">{book.category}</span>
              </div>
              <div className="book-details">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
              </div>
              <div className="book-actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(book)}
                  title="Edit this book"
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(book.id, book.title)}
                  title="Delete this book"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
