// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// === Test route: /api/hello ===
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// === Conditionally serve static files ===
// Only serve the React build folder if we're in production.
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // For any route not handled by an API endpoint, serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // In dev mode, show a simple message or handle dev routes
  app.get('/', (req, res) => {
    res.send('Running in development mode. No build folder found.');
  });
}

// === Start the server ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
