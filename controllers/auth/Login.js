const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");

// Login function based on fingerprint data
exports.login = (req, res) => {
  const { fingerprintData } = req.body;

  if (!fingerprintData) {
    return res.status(400).json({ error: "Fingerprint data is required" });
  }

  const query = "SELECT * FROM users WHERE fingerprint_data = ?";

  db.query(query, [fingerprintData], (err, result) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];

    // Log user information for debugging (exclude sensitive info in production)
    console.log("User found:", { id: user.id, name: user.name });

    try {
      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name }, // Payload
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: "1h" } // Token expiration
      );

      console.log("Generated Token:", token);

      return res.status(200).json({
        message: "Login successful",
        token, // Return the generated token
        user: { id: user.id, name: user.name }, // Optional: Return user details
      });
    } catch (tokenError) {
      console.error("Error generating token:", tokenError);
      return res.status(500).json({ error: "Failed to generate token" });
    }
  });
};
