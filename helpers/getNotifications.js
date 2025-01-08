const db = require("../db");

// Function to fetch notifications (all or for a specific user)
const getNotifications = (req, res) => {
  const userId = req.query.userId; // Extract userId from query parameters
  let query = "SELECT * FROM notifications"; // Default: fetch all notifications

  // If a specific userId is provided, filter by userId
  if (userId) {
    query += " WHERE user_id = ?";
  }

  db.query(query, userId ? [userId] : [], (err, result) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }

    // If no notifications found, return 404
    if (result.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    // Send the notifications as a response
    res.status(200).json(result);
  });
};

module.exports = getNotifications;
