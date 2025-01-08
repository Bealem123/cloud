// Import your database connection
const db = require("../../db");

// Register function to add a user with fingerprint data
exports.register = (req, res) => {
  const { name, fingerprintData } = req.body; // Assume fingerprintData will be a placeholder for now
  const attendanceStatus = false; // Default attendance status

  // Check if there are any existing admin users
  const checkAdminQuery =
    "SELECT COUNT(*) AS admin_count FROM users WHERE is_admin = 1";

  db.query(checkAdminQuery, (err, adminResult) => {
    if (err) {
      console.error("Error checking admin users:", err);
      return res.status(500).json({ error: "Failed to check admin users" });
    }

    const noAdminExists = adminResult[0]?.admin_count === 0;

    // Check total user count to determine if this is the first user
    const checkUsersQuery = "SELECT COUNT(*) AS count FROM users";

    db.query(checkUsersQuery, (err, userResult) => {
      if (err) {
        console.error("Error checking users count:", err);
        return res.status(500).json({ error: "Failed to check users" });
      }

      const userCount = userResult?.[0]?.count || 0;

      // Determine if the new user should be admin
      const isAdmin = noAdminExists && userCount === 0 ? 1 : 0;
      const role = isAdmin ? "admin" : "user";

      console.log(
        `Number of users: ${userCount}, Admin exists: ${!noAdminExists}, Assigning is_admin: ${isAdmin}, Role: ${role}`
      );

      // Insert the user into the database
      const insertUserQuery = `
        INSERT INTO users (name, fingerprint_data, attendance_status, is_admin, role) 
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertUserQuery,
        [name, fingerprintData || null, attendanceStatus, isAdmin, role],
        (err, result) => {
          if (err) {
            console.error("Error during registration:", err);
            return res.status(500).json({ error: "Registration failed" });
          }

          console.log("User successfully registered with ID:", result.insertId);

          res.status(201).json({
            message: "User registered successfully",
            is_admin: isAdmin,
            role: role,
          });
        }
      );
    });
  });
};
