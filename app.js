const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Setup database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookDB", // Explicitly specify the database here
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Endpoint to get all books
app.get('/getbooks', (req, res) => {
    const query = 'SELECT * FROM bookTable';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({ message: 'Failed to retrieve books' });
        }
        res.json(results); // Send the query result as JSON
    });
});

// Endpoint to add a book
app.post('/add-book', (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = 'INSERT INTO bookTable (title, author, price) VALUES (?, ?, ?)';
    db.query(query, [title, author, price], (err, result) => {
        if (err) {
            console.error('Error adding book:', err);
            return res.status(500).json({ success: false, message: 'Failed to add book' });
        }
        res.json({ success: true, message: 'Book added successfully!' });
    });
});

// Start the server
const port = 5500;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
