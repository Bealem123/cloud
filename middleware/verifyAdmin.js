const db = require("../db");

const verifyAdmin = (req, res, next) => {
  const userId = req.user.id; // Get the user ID from the decoded JWT data

  const query = "SELECT is_admin FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    if (result.length === 0 || !result[0].is_admin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next(); // If user is admin, continue to the next route handler
  });
};

module.exports = verifyAdmin;
