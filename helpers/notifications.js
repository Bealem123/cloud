const db = require("../db");

// Function to add a notification for a user
const addNotification = (userId, message) => {
  const query = "INSERT INTO notifications (user_id, message) VALUES (?, ?)"; // Ensure user_id matches your table

  db.query(query, [userId, message], (err, result) => {
    if (err) {
      console.error(
        "Error adding notification:",
        err.sqlMessage || err.message
      );
    } else {
      console.log(`Notification added for User ID: ${userId}`);
    }
  });
};
 
module.exports = { addNotification };
