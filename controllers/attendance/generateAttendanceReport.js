const db = require("../../db"); // Assuming db is set up to connect to MySQL

// Generate attendance report
const generateAttendanceReport = (req, res) => {
  const { userId, month } = req.query;

  // Validate input
  if (!userId || !month) {
    return res.status(400).json({ error: "User ID and month are required" });
  }

  // SQL query to fetch attendance data for a specific user and month in Ethiopian timezone
  const query = `
    SELECT * FROM attendance
    WHERE user_id = ? AND MONTH(CONVERT_TZ(timestamp, '+00:00', '+03:00')) = ?
  `;

  // Execute the query
  db.query(query, [userId, month], (err, result) => {
    if (err) {
      console.error("Error fetching attendance report:", err);
      return res.status(500).json({ error: "Failed to fetch report" });
    }

    // If no data found, return a 404 response
    if (result.length === 0) {
      return res.status(404).json({
        message: "No attendance records found for the specified user and month",
      });
    }

    // Send the attendance data as the response
    res.status(200).json(result);
  });
};

module.exports = generateAttendanceReport;
