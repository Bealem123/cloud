const pool = require("../../db"); // MySQL connection pool

// Weekly and Monthly Attendance Summary
const fetchAttendanceSummary = async (req, res) => {
  try {
    // Weekly stats query
    pool.query(
      `
      SELECT 
        YEAR(timestamp) AS year, 
        WEEK(timestamp) AS week, 
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS total_present, 
        SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS total_absent 
      FROM attendance 
      GROUP BY year, week 
      ORDER BY year DESC, week DESC;
    `,
      (err, weeklyStats) => {
        if (err) {
          console.error("Error fetching weekly stats:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch weekly stats" });
        }

        // Monthly stats query
        pool.query(
          `
        SELECT 
          YEAR(timestamp) AS year, 
          MONTH(timestamp) AS month, 
          SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS total_present, 
          SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS total_absent 
        FROM attendance 
        GROUP BY year, month 
        ORDER BY year DESC, month DESC;
      `,
          (err, monthlyStats) => {
            if (err) {
              console.error("Error fetching monthly stats:", err);
              return res
                .status(500)
                .json({ error: "Failed to fetch monthly stats" });
            }

            // Send the result as a JSON response
            res.status(200).json({ weeklyStats, monthlyStats });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).json({ error: "Failed to fetch attendance summary" });
  }
};

module.exports = { fetchAttendanceSummary };
