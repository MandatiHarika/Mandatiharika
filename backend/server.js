const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// **CRUD API for Bookstore**
// 1. Get all books
app.get("/api/books", (req, res) => {
  db.all("SELECT * FROM book", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 2. Get a single book by ID
app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM book WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Book not found" });
    res.json(row);
  });
});

// 3. Add a new book
app.post("/api/books", (req, res) => {
  const { name, author, reserve, date_of_publish, basic_info } = req.body;
  db.run(
    `INSERT INTO book (name, author, reserve, basic_info, date_of_publish) VALUES (?, ?, ?, ?, ?)`,
    [name, author, reserve, basic_info, date_of_publish],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// 4. Update an existing book
app.put("/api/books/:id", (req, res) => {
  const { name, author, reserve, date_of_publish, basic_info } = req.body;
  db.run(
    `UPDATE book SET name = ?, author = ?, reserve = ?,  date_of_publish = ?, basic_info = ? WHERE id = ?`,
    [name, author, reserve, date_of_publish, basic_info, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updatedID: req.params.id });
    }
  );
});

// 5. Delete a book
app.delete("/api/books/:id", (req, res) => {
  db.run("DELETE FROM book WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: req.params.id });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
