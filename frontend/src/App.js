import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [editingBook, setEditingBook] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = () => {
    setEditingBook(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Sistem Informasi Perpustakaan</h1>
        <p>Manajemen koleksi buku perpustakaan dengan mudah dan efisien</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <BookForm 
              onSubmit={handleFormSubmit}
              editingBook={editingBook}
              onCancel={handleCancel}
            />
          </div>
          
          <div className="list-section">
            <BookList 
              onEdit={handleEdit}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Library Management System. Built with React & PHP.</p>
      </footer>
    </div>
  );
}

export default App;
