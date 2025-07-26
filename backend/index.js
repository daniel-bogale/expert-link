require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config');
const connectDB = require('./config/db');

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use(`${config.apiPrefix}/auth`, authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Backend server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`API Base URL: ${config.apiBaseUrl}`);
  });
}); 


