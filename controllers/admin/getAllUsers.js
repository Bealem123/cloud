// controllers/admin/getAllUsers.js

const db = require("../../db");

// Get all users (Admin only)
exports.getAllUsers = (req, res) => {
  const query = "SELECT id, name, fingerprint_data, role FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }

    res.status(200).json({ users: results });
  });
};
