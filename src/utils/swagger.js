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
        name: 'User',
        description: 'Operations about user'
      },
      {
        name: "Authorization", // name of a tag
        description: 'Operations about authorization'
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
        NewUser: {
          type: "object", // data type
          properties: {
            username: {
              type: "string", // data-type   
              example: "newUser", // example of a title
            },
            password: {
              type: "string", // data type
              example: '1234', // example of a completed value
            },
            role: {
              type: "string",
              enum: ["SUPERVISOR", "RECEPCION"]
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
              format: "date - time",
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
        VisitCreate: {
          type: "object",
          properties:
          {
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
              format: "date - time",
              example: "2021-09-08T22:15:10.146Z"
            },
            visitReason:
            {
              type: "string",
              example: "Testing"
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
              example: "Nota o comentario"
            }
          }
        },
        UpdateVisit: {
          type: 'object',
          properties: {
            note:
            {
              type: "string",
              example: "Comentario actualizado"
            },
            status:
            {
              type: "string",
              enum:
                ["EN_CURSO",
                  "FINALIZADO"],
              example: "FINALIZADO"
            },
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
            description: 'test users: <ul><li>username:"user1", password: "1234", role:"SUPERVISOR"</li><li>username:"user2", password: "1234", role:"RECEPCION"</li></ul>',
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
      '/user': {
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
        },
        post: {
          tags: [
            'User'
          ],
          summary: 'Create new USER ',
          description: 'Create New User | ',
          operationId: 'CreateUser',
          requestBody: {
            description: 'Create new User | roles allowed : RECEPCION, SUPERVISOR',
            content: {
              'application/json': {
                schema: {
                  '$ref':'#components/schemas/NewUser'
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
                    '$ref': '#components/schemas/User'
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
          security: [
            {
              bearerAuth: []
            }]
        },
      },
      '/visits': {
        get: {
          tags: [
            'Visit'
          ],
          summary: 'Obtein all Visits | Role RECEPTION, SUPERVISOR',
          description: 'Visits View',
          operationId: 'VisitView',
          parameters: [
            {
              name: 'size',
              in: 'query',
              description: 'Pagination | How many instances per request',
              schema: {
                type: 'integer'
              },
              example: '10'
            },
            {
              name: 'page',
              in: 'query',
              description: 'Pagination | From which page will start counting to return instances | Starts from 1 by default',
              schema: {
                type: 'integer'
              },
              example: '1'
            },
          ],
          responses: {
            200: {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#components/schemas/Visit'
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
          security: [
            {
              bearerAuth: []
            }]
        },
        post: {
          tags: [
            'Visit'
          ],
          summary: 'Create new Visit | role RECEPTION',
          description: 'Create New Visit | The <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'CreateVisit',
          parameters: [
            {
              name: 'Visitid',
              in: 'path',
              description: 'ID of Visit',
              required: true,
              schema: {
                type: 'string',
                format: 'integer'
              }
            }],
          requestBody: {
            description: 'Create new Visit',
            content: {
              'application/json': {
                schema: {
                  '$ref': '#components/schemas/VisitCreate'

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
                    '$ref': '#components/schemas/Visit'
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
          security: [
            {
              bearerAuth: []
            }]
        },
      },
      '/visits/{visitId}': {
        get: {
          tags: [
            'Visit'
          ],
          summary: 'Get only one visit',
          description: '<strong>Get</strong> my information through the <strong>token</strong>',
          operationId: 'userInfo',
          parameters: [
            {
              name: 'Visitid',
              in: 'path',
              description: 'ID of Visit',
              required: true,
              schema: {
                type: 'string',
                format: 'integer'
              }
            }],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    "$ref": "#components/schemas/Visit"
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
          security: [
            {
              bearerAuth: []
            }]
        },
        patch: {
          tags: [
            'Visit'
          ],
          summary: 'Update my visit',
          description: 'Update my user information | The <strong>userId</strong> will be validated with the <strong>token</strong>',
          operationId: 'patchUser',
          parameters: [
            {
              name: 'Visitid',
              in: 'path',
              description: 'ID of Visit',
              required: true,
              schema: {
                type: 'string',
                format: 'integer'
              }
            }],
          requestBody: {
            description: 'UPDATE is available only to role RECEPTION',
            content: {
              'application/json': {
                schema: {
                  '$ref': '#components/schemas/UpdateVisit'
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
                    '$ref': '#components/schemas/Visit'
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
          security: [
            {
              bearerAuth: []
            }]
        }
      }
    }
  },
  apis: ['./src/users/user.routes.js', './src/auth/auth.routes.js']
}


module.exports = { options }