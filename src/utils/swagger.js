require('dotenv').config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      description: '',
      version: '1.0.0'
    },
    servers: [{ url: process.env.DOMAIN }],
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
              example: "newUser", // example of a title
            },
            password: {
              type: "string", // data type
              example: '1hk671k178k.shj8.', // example of a completed value
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
        Visit: {
          type: "object",
          properties:
          {
            id:
            {
              type: "string",
              example: "30bb14f1-3fed-4389-8186-9f0160d0bc44"
            },
            date:
            {
              type: "string",
              format: "date - time",
              example: "2021-09-08T00:00:00.146Z"
            },
            time:
            {
              type: "string",
              format: "date - time",
              example: "2000-01-01T15:30:00.146Z"
            },
            fullName:
            {
              type: "string",
              example: "Juan Flores"
            },
            idNumber:
            {
              type: "string",
              example: "1234567899"
            },
            entryDate:
            {
              type: "string",
              format:"date - time",
              example: "2021-09-08T22:15:10.146Z"
            },
            visitReason:
            {
              type: "string",
              example: "educación"
            },
            department:
            {
              type: "string",
              enum: [
                "ADMINISTRACION",
                "PROVEEDORES",
                "SERVICIO_AL_CLIENTE",
                "VENTAS"],
              example: "ADMINISTRACION"
            },
            status:
            {
              type: "string",
              enum:
                ["EN_CURSO",
                  "FINALIZADO"],
              example: "EN_CURSO"
            },
            note:
            {
              type: "string",
              example: "nueva nota"
            },
            createdById:
            {
              type: "string",
              example: "2119a3a9-0de8-433a-aa60-8ddbc4f74d3e"
            },
            createdAt:
            {
              type: "string",
              format: "date - time",
              example: "2023-09-10T00:31:21.531Z"
            },
            updatedAt:
            {
              type: "string",
              format: "date - time",
              example: "2023-09-10T04:24:07.388Z"
            }
          }
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
              type: "array",
              items:
                { '$ref': '#/components/schemas/User' }
            }
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
                { '$ref': '#/components/schemas/User' }
            }
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
    paths: {
      '/auth/login': {
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
      '/user':{
        get: {
          tags: [
            'User'
          ],
          summary: 'Get All Users',
          description: '<strong>Get</strong> my information through the <strong>token</strong>',
          operationId: 'userInfo',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    "$ref": "#components/schemas/UserPaginationResult"
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
          },
          // security: [
          //   {
          //     bearerAuth: []
          //   }]
        }
      },
      '/visits':{},
      '/visits/{visitId}':{}
    }
  },
  apis: ['./src/users/user.routes.js', './src/auth/auth.routes.js']
}


module.exports = { options }