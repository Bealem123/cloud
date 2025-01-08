const pool = require("../../db"); // MySQL connection pool

// User-specific Attendance Trends
const fetchUserAttendanceTrends = async (req, res) => {
  const userId = req.user.id; // Assuming `req.user` contains authenticated user data

  try {
    pool.query(
      `
        SELECT 
            YEAR(timestamp) AS year,
            WEEK(timestamp) AS week,
            SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS total_present,
            SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS total_absent
        FROM attendance
        WHERE user_id = ?
        GROUP BY year, week
        ORDER BY year DESC, week DESC;
      `,
      [userId],
      (err, userStats) => {
        if (err) {
          console.error("Error fetching user attendance trends:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch user attendance trends" });
        }

        // Send the result as a JSON response
        res.status(200).json({ userStats });
      }
    );
  } catch (error) {
    console.error("Error fetching user attendance trends:", error);
    res.status(500).json({ error: "Failed to fetch user attendance trends" });
  }
};

module.exports = { fetchUserAttendanceTrends };
