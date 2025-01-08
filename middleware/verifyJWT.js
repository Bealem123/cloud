// middleware/verifyJWT.js
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expecting format: "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ error: "Invalid token" });
    }

    // Set decoded token data (e.g., user id and name) in req.user
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;


