const { optional } = require("zod");
const prisma = require("../shared/client");
// const { hashPassword } = require('../utils/crypto')

class UserModel {
  static async getAll(query) {
    const options = {
      where: {},
      orderBy: {
        username: 'asc'
      }
    };
    const { limit, offset, role} = query;
    if (limit && offset) {
      options.take = Number(limit);
      options.skip = Number(offset);
    }
    // Busqueda por role
    // if (role) {
    //   options.where.role = {
    //     contains: role,
    //     mode: "insensitive" // Para que sea case-insensitive
    //   };
    // }
    const users = await prisma.user.findMany(options);
    const total = await prisma.user.count(options);
    const totalUsers = await prisma.user.count();
    return {
      users,
      total,
      totalUsers
    };
  }

  static async getById({ id }) {
    return await prisma.user.findUnique({ where: { id } });
  }
  static async getByUsername({ username }) {
    return await prisma.user.findUnique({ where: { username } });
  }

  static async create({username,password }) {
    // const hashedPassword = hashPassword(password)
    return await prisma.user.create({
      data: {
        username: username, 
        password: password
      }
    });
  }

  static async delete({ id }) {
    const deletedObject = await prisma.user.delete({ where: { id } });
    return deletedObject ? true : false;
  }

  static async update({ id, input }) {
    const updatedRecord = await prisma.user.update({
      where: { id },
      data: input,
    });

    return updatedRecord ? updatedRecord : false;
  }
}

module.exports = UserModel;
