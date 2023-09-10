const { Router } = require("express");
const UserController = require("./userController");
const passportJWT = require('../libs/passport');
const checkRole = require("../middleware/role.middleware");

const userRouter = Router();

userRouter.get("/", UserController.getAll);
// userRouter.post("/", UserController.create);
// userRouter.get("/:id", UserController.getById);
// userRouter.delete("/:id", UserController.delete);
// userRouter.patch("/:id", UserController.update);

module.exports = userRouter;

