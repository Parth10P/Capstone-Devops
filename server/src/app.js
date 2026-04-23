const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ApnaBazaar Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("ApnaBazaar Backend Service");
});

module.exports = app;
