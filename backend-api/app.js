const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(express.json()); // Built-in body parser

// CORS middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/events", eventRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error); // Log the error for debugging
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message });
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
