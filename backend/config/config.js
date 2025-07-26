// Environment configuration for the backend
const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongodbUri: process.env.MONGODB_URI,
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '24h',
  
  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:3001'],
  
  // API Configuration
  apiBaseUrl: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || port}`,
  apiPrefix: process.env.API_PREFIX || '/api',
  
  // Security Configuration
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  
  // Environment checks
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

module.exports = config; 