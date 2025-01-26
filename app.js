const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Add admin routes
require("./cronJobs/attendanceCron");
require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000", // Local frontend URL
      "https://majestic-medovik-ed36b6.netlify.app", // Deployed Netlify frontend URL
    ];

    // Allow requests without an Origin header (e.g., Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Block request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS middleware globally

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is live! 🎉");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes); // Register admin routes

// Handle preflight requests (important for CORS in browsers)
app.options("*", cors(corsOptions)); // Allow OPTIONS requests from any route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An error occurred!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const attendanceRoutes = require("./routes/attendanceRoutes");
// const adminRoutes = require("./routes/adminRoutes"); // Add admin routes
// require("./cronJobs/attendanceCron");
// require("dotenv").config();

// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: (origin, callback) => {
//     const allowedOrigins = [
//       "http://localhost:3000", // Local frontend URL
//       "https://rds-y916.onrender.com", // Deployed frontend URL
//     ];

//     // Allow requests without an Origin header (e.g., Postman) or from allowed origins
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow request
//     } else {
//       callback(new Error("Not allowed by CORS")); // Block request
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// };

// app.use(cors(corsOptions)); // Apply CORS middleware

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Root route
// app.get("/", (req, res) => {
//   res.send("Backend is live! 🎉");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/admin", adminRoutes); // Register admin routes

// // Handle preflight requests (important for CORS in browsers)
// app.options("*", cors(corsOptions)); // Allow OPTIONS requests from any route

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "An error occurred!" });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
// const attendanceRoutes = require("./routes/attendanceRoutes");
// const adminRoutes = require("./routes/adminRoutes"); // Add admin routes
// require("./cronJobs/attendanceCron");
// require("dotenv").config();

// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow multiple origins (you can add more as needed)
//     const allowedOrigins = [
//       "http://localhost:3000", // Frontend URL for development
//       "http://your-production-url.com", // Production URL
//     ];

//     // Check if the origin is allowed
//     if (allowedOrigins.includes(origin) || !origin) {
//       // Allow requests without an origin (e.g., Postman)
//       callback(null, true);
//     } else {
//       // Reject requests from disallowed origins
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers, include Authorization for JWT
// };

// app.use(cors(corsOptions)); // Apply CORS middleware with dynamic options

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/admin", adminRoutes); // Register admin routes

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "An error occurred!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
