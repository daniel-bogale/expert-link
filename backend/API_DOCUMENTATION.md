# Consultly API Documentation

## Overview

The Consultly API is a RESTful service that powers the expert consultation platform. It provides endpoints for user authentication, expert management, booking consultations, and more.

## Quick Start

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.consultly.com/api`

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Interactive Documentation

### Swagger UI
Access the interactive API documentation at: `/docs`

- **Development**: http://localhost:5000/docs
- **Production**: https://api.consultly.com/docs

### Features
- **Interactive Testing**: Test endpoints directly from the browser
- **Bearer Token Authentication**: Click the "Authorize" button to add your JWT token
- **Request/Response Examples**: See example requests and responses for each endpoint
- **Schema Validation**: Automatic validation of request bodies
- **Filtering**: Search and filter endpoints by tags

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | No |

### User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get user profile | Yes |
| PUT | `/user/profile` | Update user profile | Yes |
| POST | `/user/upload-avatar` | Upload user avatar | Yes |
| POST | `/user/professional-request` | Submit professional request | Yes |
| PUT | `/user/professional-request` | Update professional request | Yes |
| GET | `/user/professional-request/status` | Get request status | Yes |

### Experts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/experts` | Get all experts | No |
| GET | `/experts/search` | Search experts | No |
| GET | `/experts/:id` | Get expert details | No |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/:id/experts` | Get experts by category | No |

### Bookings
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create booking | Yes |
| GET | `/bookings` | Get user bookings | Yes |
| GET | `/bookings/upcoming` | Get upcoming bookings | Yes |
| GET | `/bookings/past` | Get past bookings | Yes |
| GET | `/bookings/:id` | Get booking details | Yes |
| PUT | `/bookings/:id` | Update booking | Yes |
| POST | `/bookings/:id/cancel` | Cancel booking | Yes |

## Data Models

### User
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "client",
  "avatar": "https://cloudinary.com/avatar.jpg",
  "phone": "+1234567890",
  "status": "active"
}
```

### Expert
```json
{
  "id": "507f1f77bcf86cd799439011",
  "user": { /* User object */ },
  "title": "Senior Software Engineer",
  "bio": "Experienced software engineer with 10+ years...",
  "expertise": [
    {
      "category": "technology",
      "subcategory": "web-development",
      "yearsOfExperience": 10,
      "description": "Full-stack web development"
    }
  ],
  "hourlyRate": 150,
  "rating": 4.8,
  "totalReviews": 25,
  "isAvailable": true
}
```

### Booking
```json
{
  "id": "507f1f77bcf86cd799439011",
  "client": { /* User object */ },
  "expert": { /* Expert object */ },
  "scheduledDate": "2024-01-15T10:00:00Z",
  "duration": 60,
  "status": "confirmed",
  "totalAmount": 150,
  "notes": "Need help with React development",
  "meetingLink": "https://meet.google.com/abc-defg-hij"
}
```

## Error Handling

All API responses follow a consistent error format:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (in development)"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Pagination

List endpoints support pagination with the following query parameters:

- `page` (default: 1) - Page number
- `limit` (default: 10, max: 100) - Items per page

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

## File Uploads

### Avatar Upload
- **Endpoint**: `POST /user/upload-avatar`
- **Content-Type**: `multipart/form-data`
- **Field**: `avatar`
- **File Types**: JPG, PNG, GIF
- **Max Size**: 5MB

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Other endpoints**: 100 requests per minute
- **File uploads**: 10 requests per minute

## Development

### Running the Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Variables
Create a `.env` file with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/consultly
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
```

### Testing the API
1. Start the server: `npm run dev`
2. Open Swagger UI: http://localhost:5000/docs
3. Register a new user using `/auth/register`
4. Login using `/auth/login` to get a JWT token
5. Click "Authorize" in Swagger UI and enter your token
6. Test protected endpoints

## Contributing

When adding new endpoints:

1. Add JSDoc comments to the route file
2. Update the Swagger schema definitions if needed
3. Test the endpoint in Swagger UI
4. Update this documentation

## Support

For API support, contact: support@consultly.com

## License

MIT License - see LICENSE file for details 