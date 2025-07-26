require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const app = express();
const config = require('./config/config');
const connectDB = require('./config/db');

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Consultly API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true
  }
}));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const expertRoutes = require('./routes/experts');
const categoryRoutes = require('./routes/categories');
const bookingRoutes = require('./routes/bookings');

app.use(`${config.apiPrefix}/auth`, authRoutes);
app.use(`${config.apiPrefix}/user`, userRoutes);
app.use(`${config.apiPrefix}/experts`, expertRoutes);
app.use(`${config.apiPrefix}/categories`, categoryRoutes);
app.use(`${config.apiPrefix}/bookings`, bookingRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Consultly API is running!',
    version: '1.0.0',
    environment: config.nodeEnv
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    details: config.isDevelopment ? err.message : 'Internal server error'
  });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`🚀 Consultly Backend server running on http://localhost:${config.port}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(`🔗 API Base URL: ${config.apiBaseUrl}${config.apiPrefix}`);
    console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
  });
}).catch(err => {
  console.error('❌ Database connection failed:', err);
  process.exit(1);
}); 


