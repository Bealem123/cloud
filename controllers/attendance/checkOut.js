// controllers/attendance/checkOut.js
const db = require("../../db"); // Assuming db.js handles the connection pool
const axios = require("../../axios");
// Check-out function to mark attendance as false (absent)
const checkOut = (req, res) => {
  const userId = req.user.id; // Assuming user ID is set in req.user from JWT

  const query = `UPDATE attendance SET status = FALSE WHERE user_id = ? AND status = TRUE ORDER BY timestamp DESC LIMIT 1`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error updating attendance status to checkout:", err);
      return res.status(500).json({ error: "Failed to check out" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "No check-in record found for this user to check out",
      });
    }

    res.status(200).json({ message: "Checked out successfully" });
  });
};

// Export the checkOut function
module.exports = checkOut;
