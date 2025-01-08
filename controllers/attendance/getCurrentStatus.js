const db = require("../../db"); // Assuming db.js handles the connection pool

const getCurrentStatus = (req, res) => {
  const userId = req.user?.id; // Safely access user ID from JWT

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID is missing" });
  }

  const query = `
    SELECT 
      a.status AS currentStatus, 
      a.timestamp AS lastUpdate,
      u.name AS userName
    FROM attendance a
    JOIN users u ON a.user_id = u.id
    WHERE a.user_id = ? 
    ORDER BY a.timestamp DESC 
    LIMIT 1
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching current attendance status:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve attendance status" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance record found for this user" });
    }

    const { currentStatus, lastUpdate, userName } = results[0];
    res.status(200).json({
      currentStatus,
      lastUpdate,
      userName,
    });
  });
};

module.exports = getCurrentStatus;
