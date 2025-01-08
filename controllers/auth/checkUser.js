const db = require("../../db");

exports.checkUser = (req, res) => {
  // Log the decoded user
  console.log("Decoded JWT User:", req.user);

  const userId = req.user.id;

  const query = "SELECT id, name, fingerprint_data FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (result.length === 0) {
      console.log("User not found in database");
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    console.log("Database Result:", user);

    res.status(200).json({
      message: "User authenticated",
      user: {
        id: user.id,
        name: user.name,
        fingerprint_data: user.fingerprint_data,
      },
    });
  });
};
