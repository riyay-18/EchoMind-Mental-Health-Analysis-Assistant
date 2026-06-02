require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Test
app.get("/", (req, res) => {
  res.json({ message: "EchoMind API running ✅" });
});

// Test register directly
app.post("/test", (req, res) => {
  res.json({ received: req.body });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/analysis", require("./routes/analysis"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EchoMind backend running on port ${PORT}`);
});