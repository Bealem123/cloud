const db = require("../../db"); // Assuming db.js handles the connection pool

// Get attendance history for the user
const getAttendanceHistory = (req, res) => {
  const userId = req.user.id; // Assuming user ID is set in req.user from JWT

  // Query to fetch attendance history for the user, including user name
  const query = `
    SELECT a.id, a.user_id, a.timestamp, a.status, u.name as userName
    FROM attendance a
    LEFT JOIN users u ON a.user_id = u.id
    WHERE a.user_id = ?
    ORDER BY a.timestamp DESC`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      // Log error details for debugging
      console.error("Error fetching attendance history:", err);
      return res
        .status(500)
        .json({
          error:
            "Failed to retrieve attendance history. Please try again later.",
        });
    }

    if (results.length === 0) {
      // No history records found for the user
      return res.status(404).json({ message: "No attendance history found." });
    }

    // Return the attendance history with user name
    res.status(200).json({ attendanceHistory: results });
  });
};

// Export the getAttendanceHistory function
module.exports = getAttendanceHistory;
