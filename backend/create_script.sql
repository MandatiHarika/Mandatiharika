-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Create campaigns table
CREATE TABLE book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,      -- Unique identifier for each book
    name TEXT NOT NULL,                        -- Name of the book
    basic_info TEXT,                           -- Description or summary of the book
    author TEXT NOT NULL,                      -- Author of the book
    reserve INTEGER DEFAULT 0,                -- Reserve status (0 = Available, 1 = Reserved)
    date_of_publish DATETIME DEFAULT CURRENT_TIMESTAMP -- Date when the book was published
);



