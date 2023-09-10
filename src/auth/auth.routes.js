const { Router } = require("express");
const AuthController = require('./authController')

const authRouter = Router();

authRouter.post("/login", AuthController.createToken);

module.exports = authRouter;
