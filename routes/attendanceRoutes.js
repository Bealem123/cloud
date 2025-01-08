const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const markAttendance = require("../controllers/attendance/markAttendance");
const getAttendanceHistory = require("../controllers/attendance/getAttendanceHistory");
const getCurrentStatus = require("../controllers/attendance/getCurrentStatus");
const generateAttendanceReport = require("../controllers/attendance/generateAttendanceReport");
const getNotifications = require("../helpers/getNotifications"); // Import your notification routes
const checkOut = require("../controllers/attendance/checkOut");
const { fetchUserAttendanceTrends } = require("../controllers/analytics/userStats");

// Route to mark attendance (check-in) with validation for userId and attendanceStatus
router.post(
  "/mark",
  verifyJWT,
  [
    body("userId").isInt().withMessage("User ID must be a valid integer."),
    body("attendanceStatus")
      .isBoolean()
      .withMessage("Attendance status must be a boolean value (true/false)."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    markAttendance(req, res); // Handle the attendance marking logic
  }
);

// Route to get attendance history
router.get("/history", verifyJWT, getAttendanceHistory);

// Route to get current attendance status


// Route to check-out (mark attendance as absent)
router.post("/checkout", verifyJWT, checkOut);

// Route to generate attendance report
router.get("/report", verifyJWT, generateAttendanceReport);

// Route to get notifications
router.get("/notifications", verifyJWT, getNotifications);

// User: Fetch attendance trends
router.get("/attendance-trends", verifyJWT , fetchUserAttendanceTrends);

router.get("/current-status", verifyJWT, getCurrentStatus);
module.exports = router;
