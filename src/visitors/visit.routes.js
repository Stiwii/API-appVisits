const { Router } = require("express");
const VisitController = require("./visitController");
const passportJWT = require('../libs/passport');
const checkRole = require("../middleware/role.middleware");

const visitRouter = Router();

visitRouter.get("/",
    passportJWT.authenticate('jwt', { session: false }),
    checkRole(['RECEPCION', 'SUPERVISOR']),
    VisitController.getAll);

visitRouter.post("/",
    checkRole(['RECEPCION']),
    VisitController.create);

visitRouter.get("/:id",
    checkRole(['RECEPCION', 'SUPERVISOR']),
    VisitController.getById);

visitRouter.patch("/:id",
    checkRole(['RECEPCION']),
    VisitController.updateReception);

// visitRouter.delete("/:id", checkRole(['RECEPCION']), VisitController.delete);
// visitRouter.patch("/:id",checkRole(['RECEPCION']), VisitController.update);

module.exports = visitRouter;

