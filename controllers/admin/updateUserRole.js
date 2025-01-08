const db = require("../../db");
const { addNotification } = require("../../helpers/notifications"); // Import the notification helper

// Update user role
exports.updateUserRole = (req, res) => {
  const { newRole } = req.body; // Extract `newRole` from the body
  const userId = req.params.id; // Extract `id` from the URL parameter

  if (!newRole || !userId) {
    return res.status(400).json({ error: "User ID and new role are required" });
  }

  // Determine the value for `is_admin` based on the new role
  const isAdmin = newRole === "admin" ? 1 : 0;

  const query = "UPDATE users SET role = ?, is_admin = ? WHERE id = ?";
  db.query(query, [newRole, isAdmin, userId], (err, result) => {
    if (err) {
      console.error("Error updating user role:", err);
      return res.status(500).json({ error: "Failed to update role" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send a notification to the user about the role update
    const notificationMessage = `Your role has been updated to ${newRole}.`;
    addNotification(userId, notificationMessage);

    res.status(200).json({
      message: "User role and admin status updated successfully",
      updatedRole: newRole,
      is_admin: isAdmin,
    });
  });
};
