const { parse } = require("json2csv");
const pool = require("../../db"); // MySQL connection pool

// Export attendance data as CSV
const exportAttendanceData = async (req, res) => {
  try {
    console.log("Starting database query...");

    // Fetch all attendance data from MySQL
    pool.query(
      `
      SELECT 
        user_id, 
        timestamp, 
        status
      FROM attendance
    `,
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Database query error" });
        }

        // Ensure that results is an array
        if (!Array.isArray(results)) {
          return res
            .status(500)
            .json({ error: "Data returned from database is not an array" });
        }

        // Check if results contain any data
        if (results.length === 0) {
          return res.status(404).json({ error: "No attendance data found" });
        }

        console.log(
          "Data fetched successfully, proceeding to convert to CSV..."
        );

        // Map the status to boolean (true/false)
        const updatedResults = results.map((row) => ({
          ...row,
          status: row.status === 1 ? true : false, // Convert 1 to true, 0 to false
        }));

        console.log("Updated Results:", updatedResults);

        // Convert the JSON data to CSV using json2csv
        const csvData = parse(updatedResults); // Convert directly to CSV

        console.log("CSV Data Generated:", csvData); // Log the generated CSV data

        // Set response headers for CSV file download
        res.header("Content-Type", "text/csv");
        res.attachment("attendance_data.csv");
        res.send(csvData);
      }
    );
  } catch (error) {
    console.error("Error exporting attendance data:", error); // Log the error
    res.status(500).json({ error: "Failed to export attendance data" });
  }
};

module.exports = { exportAttendanceData };
