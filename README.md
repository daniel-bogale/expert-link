# Hackaton Project

A full-stack application with React/Next.js frontend and Node.js/Express backend.

## Project Structure

```
Hackaton/
├── backend/          # Node.js/Express API server
├── frontend/         # Next.js React application
└── README.md         # This file
```

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/hackaton

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# API Configuration
API_BASE_URL=http://localhost:5000
API_PREFIX=/api

# Security
BCRYPT_ROUNDS=12
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory with the following variables:

```env
# Frontend Environment Variables

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# App Configuration
NEXT_PUBLIC_APP_NAME=Hackaton App
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development
NODE_ENV=development
```

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `.env` file with your configuration (see above)

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `.env.local` file with your configuration (see above)

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Configuration Files

### Backend Configuration

The backend uses a centralized configuration file at `backend/config/config.js` that loads all environment variables and provides default values.

### Frontend Configuration

The frontend uses a centralized configuration file at `frontend/src/config/env.ts` that provides type-safe access to environment variables.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Environment Variables Reference

### Backend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/hackaton` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key-change-this-in-production` |
| `JWT_EXPIRE` | JWT expiration time | `24h` |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | `http://localhost:3000,http://localhost:3001` |
| `API_BASE_URL` | Base URL for the API | `http://localhost:5000` |
| `API_PREFIX` | API route prefix | `/api` |
| `BCRYPT_ROUNDS` | Bcrypt salt rounds | `12` |

### Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL with prefix | `http://localhost:5000` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Hackaton App` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |
| `NODE_ENV` | Environment mode | `development` |

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT secrets** in production
3. **Update CORS origins** for production domains
4. **Use environment-specific configurations** for different deployment stages

## Development Workflow

1. Start MongoDB
2. Start the backend server (`npm run dev` in backend/)
3. Start the frontend server (`npm run dev` in frontend/)
4. Access the application at `http://localhost:3000`

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong, unique `JWT_SECRET`
3. Configure proper `CORS_ORIGIN` for your domain
4. Use a production MongoDB instance
5. Set appropriate `PORT` for your hosting environment 