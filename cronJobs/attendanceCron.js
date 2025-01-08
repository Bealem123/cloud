const cron = require("node-cron");
const db = require("../db");
const { addNotification } = require("../helpers/notifications"); // Correct file for addNotification

// Schedule the cron job to run at 8 PM daily
cron.schedule("0 20 * * *", () => {
  console.log("Cron job started: Running daily attendance check...");

  const query = "SELECT id, name FROM users WHERE attendance_status = false";

  db.query(query, (err, users) => {
    if (err) {
      console.error("Error checking attendance:", err);
      return;
    }

    if (users.length === 0) {
      console.log("No users with missed attendance found.");
    } else {
      console.log(`Users with missed attendance: ${JSON.stringify(users)}`);
    }

    // Log each user and notification action
    users.forEach((user) => {
      console.log(`Sending notification to User ID: ${user.id}`); // Log user info
      addNotification(user.id, "You missed attendance today. Please check.");
      console.log(`Notification sent to User ID: ${user.id}`);
    });
  });
});
