const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Endpoint 1: Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Endpoint 2: Greeting endpoint with optional query parameter
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'World';
  res.json({
    message: `Hello This is, ${name}!`
  });
});

// 404 fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
