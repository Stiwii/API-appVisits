const { validateUser, validatePartialUser } = require("./userSchema");
const UserModel = require("./userModel");
const { getPagination, getPagingData } = require("../utils/pagination-utils");

class UserController {
  static async getAll(req, res, next) {
    try {
      let query = req.query;
      let { page, size } = query;
      const { limit, offset } = getPagination(page, size, 10); // Asumiendo que 10 es el tamaño de página por defecto
      query.limit = limit;
      query.offset = offset;

      let users = await UserModel.getAll(query);
      const results = getPagingData(users, page, limit);
      return res.json({ results: results });

    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res,) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });
    if (user) return res.json(user);
    res.status(404).json({ message: "User not found" });
  }

  static async create(req, res, next) {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await UserModel.create(req.body);

    res.status(201).json(newUser);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await UserModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted" });
  }

  static async update(req, res) {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
 
    const updatedUser = await UserModel.update({
      id,
      input: result.data,
    });

    return res.json(
      updatedUser ? updatedUser : { message: "User not found" }
    );
  }
}

module.exports = UserController;