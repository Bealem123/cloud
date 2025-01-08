// controllers/admin/deleteUser.js

const db = require("../../db");
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
