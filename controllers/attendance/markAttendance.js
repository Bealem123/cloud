// controllers/attendance/markAttendance.js
const db = require("../../db"); // Assuming db.js handles the connection pool
const axios = require("../../axios");
// Mark attendance (Check-in)
const markAttendance = (req, res) => {
  const { userId, fingerprintData } = req.body; // User and fingerprint data from the request

  // Step 1: Verify the user's fingerprint data
  const fingerprintQuery = `SELECT * FROM users WHERE id = ? AND fingerprint_data = ?`;

  db.query(fingerprintQuery, [userId, fingerprintData], (err, results) => {
    if (err) {
      console.error("Database error during fingerprint verification:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Fingerprint mismatch" });
    }

    // Step 2: Fingerprint is valid, mark attendance
    const attendanceQuery = `INSERT INTO attendance (user_id, timestamp, status) VALUES (?, NOW(), TRUE)`;

    db.query(attendanceQuery, [userId], (err, result) => {
      if (err) {
        console.error("Error marking attendance:", err);
        return res.status(500).json({ error: "Attendance marking failed" });
      }
      res.status(200).json({ message: "Attendance marked successfully" });
    });
  });
};

// Export the markAttendance function
module.exports = markAttendance;
