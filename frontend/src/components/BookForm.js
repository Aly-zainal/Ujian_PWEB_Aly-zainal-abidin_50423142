import React, { useState, useEffect } from 'react';
import './BookForm.css';

/**
 * BookForm Component
 * 
 * Form untuk menambah buku baru atau mengedit buku yang sudah ada
 * Menangani validasi input dan mengirim data ke backend API
 */
function BookForm({ onSubmit, editingBook, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    publisher: '',
    category: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value,
    }));
  };

  const validateForm = () => {
    const { title, author, publisher, category } = formData;
    
    if (!title.trim() || !author.trim() || !publisher.trim() || !category.trim()) {
      alert('Please fill in all fields');
      return false;
    }
    
    if (formData.year < 1000 || formData.year > new Date().getFullYear()) {
      alert('Please enter a valid year');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const endpoint = editingBook 
      ? 'http://localhost/Tugas%20PWEB/backend/updateBook.php'
      : 'http://localhost/Tugas%20PWEB/backend/addBook.php';

    const method = editingBook ? 'PUT' : 'POST';

    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        resetForm();
        onSubmit();
      } else {
        alert('Error: ' + (result.message || 'Operation failed'));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      year: new Date().getFullYear(),
      publisher: '',
      category: '',
    });
  };

  return (
    <div className="form-container">
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            maxLength="255"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            maxLength="255"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Publication Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Fiction, Education"
              maxLength="100"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Enter publisher name"
            maxLength="255"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (editingBook ? 'Update Book' : 'Add Book')}
          </button>
          {editingBook && (
            <button type="button" className="cancel-btn" onClick={onCancel} disabled={isLoading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
