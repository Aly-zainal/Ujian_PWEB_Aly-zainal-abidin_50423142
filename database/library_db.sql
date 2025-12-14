CREATE DATABASE IF NOT EXISTS library_db;

USE library_db;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, year, publisher, category) VALUES
('Filosofi Ketimpangan', 'Arief Arifwiritmo', 2015, 'Gramedia Pustaka Utama', 'Ekonomi'),
('Laskar Pelangi', 'Andrea Hirata', 2005, 'Bentang Pustaka', 'Fiksi'),
('Sapiens', 'Yuval Noah Harari', 2011, 'Harper', 'Sejarah');
