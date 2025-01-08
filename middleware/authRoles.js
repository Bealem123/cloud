// middleware/authRoles.js

const jwt = require("jsonwebtoken");
const db = require("../db");

// Middleware to check if the user has the specified role
const authRoles = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Extract user ID and role from token
      const userId = decoded.id;

      // Query database to verify the user's role
      const query = "SELECT role FROM users WHERE id = ?";
      db.query(query, [userId], (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ error: "Server error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const userRole = results[0].role;

        if (userRole !== requiredRole) {
          return res
            .status(403)
            .json({ error: `Access denied for role ${userRole}` });
        }

        req.user = { id: userId, role: userRole }; // Attach user info to request
        next();
      });
    });
  };
};

module.exports = authRoles;
