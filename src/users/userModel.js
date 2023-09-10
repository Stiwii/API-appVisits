const { optional } = require("zod");
const prisma = require("../shared/client");
const { hashPassword } = require("../utils/crypto");
const CustomError = require("../utils/custom-error");

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
    const data = await prisma.user.findMany(options);
    const total = await prisma.user.count(options);
    const totalData = await prisma.user.count();
    return {
      data,
      total,
      totalData
    };
  }

  static async getById({ id }) {
    const user = await prisma.user.findFirst({ where: { id } });
    if (user === null) throw new CustomError('user not found', 404, 'Not Found')
    return user 
  }

  static async getByUsername( username ) {
    const user =await prisma.user.findUnique({ where: { username } });
    if (user === null) throw new CustomError('username not found', 404, 'Not Found')
    return user
  }

  static async create({username,password, role }) {
    return await prisma.user.create({
      data: {
        username: username, 
        password: hashPassword(password),
        role: role,
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
