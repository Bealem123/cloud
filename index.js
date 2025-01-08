// backend/index.js

const app = require("./app"); // Import app from app.js
const mysql = require("mysql"); // Import mysql2 for MySQL database
require("dotenv").config(); // Load environment variables

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
db.getConnection((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if there's a connection error
  } else {
    console.log("Connected to the MySQL database");

    // Start the server after the database connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

// Export the db connection to use in other files
module.exports = db;
