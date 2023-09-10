require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      description: '',
      version: '1.0.0'
    },
    servers: [{url: process.env.DOMAIN}],
    tags: [
      {
        name: "Authorization", // name of a tag
        description: 'Operations about authorization'
      },
      {
        name: 'User',
        description: 'Operations about user'
      },
      {
        name: 'Visit',
        description: 'Operations about visit'
      },
    ],
    components: {
      schemas: {
        Auth: {
          type: "object", // data type
          properties: {
            message: {
              type: "string",
              description: "",
              example: "Correct Credentials!"
            },
            token: {
              type: "string",
              description: "Token Authorized",
              example: "eyJhbGciOiJIUzI1NiIsInR5..."
            }
          }
        },
        User: {
          type: "object", // data type
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            username: {
              type: "string", // data-type
              description: "Todo's title", // desc
              example: "Coding in JavaScript", // example of a title
            },
            password: {
              type: "boolean", // data type
              description: "The status of the todo", // desc
              example: false, // example of a completed value
            },
            role: {
              type: "string",
              enum: ["SUPERVISOR", "RECEPCION"]
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },

          },
        },
        UserPaginationResult:
        {
          type: "object",
          properties: {
            total:
            {
              type: "integer",
              example: 2
            },
            datePerPage:
            {
              type: "integer",
              example: 2
            },
            Pages:
            {
              type: "integer",
              example: 1
            },
            currentPage:
            {
              type: "integer",
              example: 1
            },
            results:
            {
              type: "object",
              items:
                {'$ref' : '#/components/schemas/User'}}
          }
        },
        VisitPaginationResult:
        {
          type: "object",
          properties: {
            total:
            {
              type: "integer",
              example: 2
            },
            datePerPage:
            {
              type: "integer",
              example: 2
            },
            Pages:
            {
              type: "integer",
              example: 1
            },
            currentPage:
            {
              type: "integer",
              example: 1
            },
            results:
            {
              type: "object",
              items:
                {'$ref' : '#/components/schemas/User'}}
          }
        },
        Error: {
          type: "object", //data type
          properties: {
            statusCode: {
              type: "error",
              format: "integer",
              description: "Status Code",
              example: "400"
            },
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "username not found", // example of an error message
            },
            errorName: {
              type: "string", // data type
              description: "Error Type", // desc
              example: "Not Found", // example of an error internal code
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          description: '<strong>Add JWT Token</strong>',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
    paths:{
      '/login': {
        post: {
          tags: [
            'Authorization'
          ],
          summary: 'Login to API',
          description: 'After LogIn token is generated',
          operationId: 'LogIn',
          requestBody: {
            description: 'The email property is unique and the default profile is public',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string', required: true, example: 'myUser'
                    },
                    password: {
                      type: 'string', required: true, example: '1234'
                    }

                  }

                }
              }
            },
            required: true
          },
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#components/schemas/Auth'
                  }
                }
              }
            },
            'Error?': {
              description: 'The StatusCode shows HTTP response status code',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
    }
  },
  apis: ['./src/users/user.routes.js', './src/auth/auth.routes.js']
}


module.exports = { options }