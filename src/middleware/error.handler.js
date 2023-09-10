const { PrismaClientKnownRequestError } = require('@prisma/client');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  let { status } = err;
  if (!status) {
    status = 500;
  }
  return res.status(status).json({
    statusCode: status,
    message: err.message,
    errorName: err.name,
    // stack: err.stack, // Descomenta si quieres mostrar el stack
  });
}

function errorJWT(err, req, res, next) {
  if (err.name === 'InvalidCharacterError') {
    return res.status(401).json({
      statusCode: 401,
      message: err.message,
      errorName: err.name
    });
  }
  next(err);
}

function handlerAuthError(err, req, res, next) {
  if (err.status === 401 || err.status === 403) {
    return res.status(err.status).json({
      statusCode: err.status,
      errorName: err.name,
      message: err.message,
      errors: err.errors,
      // stack: err.stack,
      code: err.code,
    })
  }
  //   if (err.name === "CustomName")
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      statusCode: err.status,
      errorName: err.name,
      message: err.message,
      errors: err.errors,
      // stack: err.stack,
      // code: err.code,
    })
  }
  if (err.name === "Error Testing") {
    return res.status(401).json({
      errorName: err.name,
      message: err.message,
      errors: err.errors,
      // stack: err.stack,
      code: err.code,
    })
  }
  next(err)
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':  // Error de restricción única
        return res.status(409).json({
          statusCode: 409,
          errorName: err.name,
          message: `A record with this data already exists. Details: ${err.message}`
        });
      case 'P2016':  // Errores de consulta inválida
        return res.status(409).json({
          statusCode: 409,
          errorName: err.name,
          message: err.message
        });
      case 'P2003':  // Errores de consulta inválida
        return res.status(409).json({
          statusCode: 409,
          errorName: err.name,
          message: err.message,
    
        });
      // ... puedes agregar más códigos de error específicos de Prisma si lo necesitas
      default:
        return res.status(500).json({
          statusCode: 500,
          errorName: err.name,
          message: 'An unknown error occurred.'
        });
    }
  }
  next(err);
}

module.exports = { logErrors, handlerAuthError, errorHandler, ormErrorHandler, errorJWT };