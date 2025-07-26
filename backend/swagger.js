const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Consultly API',
      version: '1.0.0',
      description: 'Expert consultation platform API for connecting clients with professional experts',
      contact: {
        name: 'Consultly API Support',
        email: 'support@consultly.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.consultly.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        }
      },
      schemas: {
        // User schemas
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            username: { type: 'string', example: 'john_doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            role: { type: 'string', enum: ['client', 'expert', 'admin'], example: 'client' },
            avatar: { type: 'string', example: 'https://cloudinary.com/avatar.jpg' },
            phone: { type: 'string', example: '+1234567890' },
            status: { type: 'string', enum: ['active', 'inactive', 'suspended'], example: 'active' }
          }
        },
        UserRegistration: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string', minLength: 2, maxLength: 50, example: 'john_doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', minLength: 6, example: 'password123' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Login successful' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
              }
            }
          }
        },
        // Expert schemas
        Expert: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            user: { $ref: '#/components/schemas/User' },
            title: { type: 'string', example: 'Senior Software Engineer' },
            bio: { type: 'string', example: 'Experienced software engineer with 10+ years...' },
            expertise: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  category: { type: 'string', example: 'technology' },
                  subcategory: { type: 'string', example: 'web-development' },
                  yearsOfExperience: { type: 'number', example: 10 },
                  description: { type: 'string', example: 'Full-stack web development' }
                }
              }
            },
            hourlyRate: { type: 'number', example: 150 },
            rating: { type: 'number', example: 4.8 },
            totalReviews: { type: 'number', example: 25 },
            isAvailable: { type: 'boolean', example: true }
          }
        },
        // Category schemas
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Technology' },
            description: { type: 'string', example: 'Technology and software development' },
            icon: { type: 'string', example: '💻' },
            expertCount: { type: 'number', example: 45 }
          }
        },
        // Booking schemas
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            client: { $ref: '#/components/schemas/User' },
            expert: { $ref: '#/components/schemas/Expert' },
            scheduledDate: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00Z' },
            duration: { type: 'number', example: 60 },
            status: { type: 'string', enum: ['pending', 'confirmed', 'completed', 'cancelled'], example: 'confirmed' },
            totalAmount: { type: 'number', example: 150 },
            notes: { type: 'string', example: 'Need help with React development' },
            meetingLink: { type: 'string', example: 'https://meet.google.com/abc-defg-hij' }
          }
        },
        BookingCreate: {
          type: 'object',
          required: ['expertId', 'scheduledDate', 'duration'],
          properties: {
            expertId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            scheduledDate: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00Z' },
            duration: { type: 'number', minimum: 15, maximum: 480, example: 60 },
            notes: { type: 'string', example: 'Need help with React development' }
          }
        },
        // Professional Request schemas
        ProfessionalRequest: {
          type: 'object',
          properties: {
            isServiceProvider: { type: 'boolean', example: true },
            status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'pending' },
            submittedAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' },
            title: { type: 'string', example: 'Senior Software Engineer' },
            bio: { type: 'string', example: 'Experienced software engineer...' },
            expertise: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  category: { type: 'string', example: 'technology' },
                  subcategory: { type: 'string', example: 'web-development' },
                  yearsOfExperience: { type: 'number', example: 10 },
                  description: { type: 'string', example: 'Full-stack development' }
                }
              }
            },
            hourlyRate: { type: 'number', example: 150 }
          }
        },
        // Error schemas
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Error message' },
            details: { type: 'string', example: 'Additional error details' }
          }
        },
        // Success response schema
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs; 