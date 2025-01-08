const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/admin/getAllUsers");
const { updateUserRole } = require("../controllers/admin/updateUserRole");
const { deleteUser } = require("../controllers/admin/deleteUser"); // Import deleteUser controller
const { fetchAttendanceSummary } = require("../controllers/analytics/adminReports");
const { exportAttendanceData } = require("../controllers/analytics/exportAttendanceData"); // Import the export function
const authRoles = require("../middleware/authRoles"); // Authorization check for roles

// Route to get all users (only accessible by admin)
router.get("/users", authRoles("admin"), getAllUsers);

// Route to update user role (only accessible by admin)
router.put("/user/:id/role", authRoles("admin"), updateUserRole);

// Route to delete a user (only accessible by admin)
router.delete("/user/:id", authRoles("admin"), deleteUser);

// Admin: Fetch attendance summary
router.get("/attendance-summary", authRoles("admin"), fetchAttendanceSummary);

// Route to export attendance data as CSV (only accessible by admin)
router.get("/export-attendance", authRoles("admin"), exportAttendanceData);
module.exports = router;
