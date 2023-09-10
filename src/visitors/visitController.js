const { validateVisit, validatePartialVisit } = require("./visitSchema");
const VisitModel = require("./visitModel");
const { getPagination, getPagingData } = require("../utils/pagination-utils");

class VisitController {
  static async getAll(req, res, next) {
    try {
      let query = req.query;
      let { page, size } = query;
      const { limit, offset } = getPagination(page, size, 10); // Asumiendo que 10 es el tamaño de página por defecto
      query.limit = limit;
      query.offset = offset;

      let visits = await VisitModel.getAll(query);
      const results = getPagingData(visits, page, limit);
      return res.json({ results: results });

    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res,) {
    const { id } = req.params;
    const visit = await VisitModel.getById({ id });
    if (visit) return res.json(visit);
    res.status(404).json({ message: "Visit not found" });
  }

  static async create(req, res, next) {
    const result = validateVisit(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newVisit = await VisitModel.create(req.body);
    res.status(201).json(newVisit);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await VisitModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Visit not found" });
    }

    return res.json({ message: "Visit deleted" });
  }

  static async update(req, res) {
    const result = validatePartialVisit(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    // const updatedVisit = await VisitModel.update({
    //   id,
    //   input: result.data,
    // });
    
    return res.json(
      updatedVisit ? updatedVisit : { message: "Visit not found" }
    );
  }
  static async updateReception(req, res) {
    const result = validatePartialVisit(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedVisit = await VisitModel.updateNoteOrStatus({
      id,
      input: result.data,
    });
    
    return res.json(
      updatedVisit ? updatedVisit : { message: "Visit not found" }
    );
  }
}

module.exports = VisitController;