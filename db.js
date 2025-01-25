const mysql = require("mysql");

const db = mysql.createConnection({
  host: "scanner.c3o6a8e6utwb.eu-north-1.rds.amazonaws.com",
  user: "admin", // replace with your username
  password: "bini1221", // replace with your password
  database: "attendance", // Corrected: Removed space between 'attendance' and '_system'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// SQL Query to create the 'users' table
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    fingerprint_data BLOB,  -- Store fingerprint data here
    attendance_status BOOLEAN DEFAULT FALSE
  );
`;

// SQL Query to create the 'attendance' table
const createAttendanceTableQuery = `
  CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,                       -- Foreign key to reference users
    attendance_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record date and time
    status BOOLEAN DEFAULT TRUE,        -- Track attendance status (e.g., present or absent)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

// SQL Query to create the 'notifications' table
const createNotificationsTableQuery = `
  CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,                       -- Foreign key to reference users
    message VARCHAR(255),              -- Column for the notification message
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set creation time
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

// Execute the query to create the 'users' table
db.query(createUsersTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating 'users' table:", err);
    return;
  }
  console.log('Table "users" created or already exists.');
});

// Execute the query to create the 'attendance' table
db.query(createAttendanceTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating 'attendance' table:", err);
    return;
  }
  console.log('Table "attendance" created or already exists.');
});

// Execute the query to create the 'notifications' table
db.query(createNotificationsTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating 'notifications' table:", err);
    return;
  }
  console.log('Table "notifications" created or already exists.');
});

// Don't call db.end() here to keep the connection open for future queries

module.exports = db;





// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "bealem", // replace with your username
//   password: "a1b2c3", // replace with your password
//   database: "attendance _system", // Corrected: Removed space between 'attendance' and '_system'
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the MySQL database.");
// });

// // SQL Query to create the 'users' table
// const createUsersTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     fingerprint_data BLOB,  -- Store fingerprint data here
//     attendance_status BOOLEAN DEFAULT FALSE
//   );
// `;

// // SQL Query to create the 'attendance' table
// const createAttendanceTableQuery = `
//   CREATE TABLE IF NOT EXISTS attendance (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,                       -- Foreign key to reference users
//     attendance_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record date and time
//     status BOOLEAN DEFAULT TRUE,        -- Track attendance status (e.g., present or absent)
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//   );
// `;

// // SQL Query to create the 'notifications' table
// const createNotificationsTableQuery = `
//   CREATE TABLE IF NOT EXISTS notifications (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,                       -- Foreign key to reference users
//     message VARCHAR(255),              -- Column for the notification message
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set creation time
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//   );
// `;

// // Execute the query to create the 'users' table
// db.query(createUsersTableQuery, (err, result) => {
//   if (err) {
//     console.error("Error creating 'users' table:", err);
//     return;
//   }
//   console.log('Table "users" created or already exists.');
// });

// // Execute the query to create the 'attendance' table
// db.query(createAttendanceTableQuery, (err, result) => {
//   if (err) {
//     console.error("Error creating 'attendance' table:", err);
//     return;
//   }
//   console.log('Table "attendance" created or already exists.');
// });

// // Execute the query to create the 'notifications' table
// db.query(createNotificationsTableQuery, (err, result) => {
//   if (err) {
//     console.error("Error creating 'notifications' table:", err);
//     return;
//   }
//   console.log('Table "notifications" created or already exists.');
// });

// // Don't call db.end() here to keep the connection open for future queries

// module.exports = db;
