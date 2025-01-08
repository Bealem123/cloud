const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
const { login } = require("../controllers/auth/Login"); // Import login controller
const { register } = require("../controllers/auth/Register"); // Import the register controller
const { checkUser } = require("../controllers/auth/checkUser"); // Import checkUser controller
const verifyJWT = require("../middleware/verifyJWT");

// Set up rate limiter for login and register routes
const loginRateLimiter = rateLimit({
  windowMs:  60 * 1000, // 1 minutes for testing
  max: 5, // Limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes.",
});

const registerRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 registration attempts per windowMs
  message:
    "Too many registration attempts from this IP, please try again after 15 minutes.",
});

// POST route for login using fingerprint data with validation and rate limiting
router.post(
  "/login",
  loginRateLimiter, // Apply rate limiter
  [
    body("fingerprintData")
      .notEmpty()
      .withMessage("Fingerprint data is required.")
      .isString()
      .withMessage("Fingerprint data must be a string."), // Assuming fingerprint data is a string, adjust accordingly
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    login(req, res); // Handle login logic if validation passes
  }
);

// POST request to register a user with validation and rate limiting
router.post(
  "/register",
  registerRateLimiter, // Apply rate limiter
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string."), // Ensure name is a string
    body("fingerprintData")
      .notEmpty()
      .withMessage("Fingerprint data is required.")
      .isString()
      .withMessage("Fingerprint data must be a string."), // Ensure fingerprint data is a string
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    register(req, res); // Handle registration logic if validation passes
  }
);

// GET route to check if the user is authenticated
router.get("/check-user", verifyJWT, checkUser);

module.exports = router;
