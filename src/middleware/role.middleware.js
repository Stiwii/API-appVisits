
const jwt = require('jsonwebtoken');

// Suponemos que tienes una SECRET_KEY para verificar el JWT.

function checkRole(allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(403).send({ message: "No token provided." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Failed to authenticate token." });
      }

      // Decodificar el rol del token y verificar si está permitido
      const userRole = decoded.role;
      if (allowedRoles.includes(userRole)) {
        // Pasa al siguiente middleware o ruta si todo está bien
        next();
      } else {
        // Si el rol no tiene permisos, enviar una respuesta 403 (Forbidden)
        res.status(403).send({ message: "Access denied." });
      }
    });
  };
}

module.exports = checkRole;
