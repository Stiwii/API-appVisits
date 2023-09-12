const { optional } = require("zod");
const prisma = require("../shared/client");
const { hashPassword } = require("../utils/crypto");
const CustomError = require("../utils/custom-error");

class VisitModel {
  static async getAll(query) {
    const options = {
      where: {},
      orderBy: {
        fullName: 'asc'
      }
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.take = Number(limit);
      options.skip = Number(offset);
    }

    const data = await prisma.visit.findMany(options);
    const total = await prisma.visit.count(options);
    const totalData = await prisma.visit.count();
    return {
      data,
      total,
      totalData
    };
  }

  static async getById({ id }) {
    try{
    const visit = await prisma.visit.findFirst({ where: { id } });
     if(visit === null ) throw new CustomError('visit not found', 404, 'Not Found')
    return visit
  }catch(error){
    throw error
  }
    
  }

  static async getByIdNumber(idNumber) {
    try {
      const visit = await prisma.visit.findUnique({ where: { idNumber } });
      if(visit === null )throw new CustomError('visit not found', 404, 'Not Found')
      return visit
    } catch (error) {
      throw error
    }
  }

  static async create({
    date,
    time,
    fullName,
    idNumber,
    entryDate,
    visitReason,
    department,
    status,
    note
  },
  createdById) {

    try {
      const visit = await prisma.visit.create({
        data: {
          date,
          time,
          fullName,
          idNumber,
          entryDate,
          visitReason,
          department,
          status,
          note,
          createdById,
        }
      });
      return visit
    }
    catch (error) {
      throw error
    }
  }

  static async delete({ id }) {
    const deletedObject = await prisma.visit.delete({ where: { id } });
    return deletedObject ? true : false;
  }
  //   Update All 
  static async update({ id, input }) {
    try {
      const updatedRecord = await prisma.visit.update({
        where: { id },
        data: input,
      });
      return updatedRecord
    } catch (error) {
      throw error
    }

  }

  //Update a Note
  static async updateNoteOrStatus({ id, input }) {
    try {
      const updatedRecord = await prisma.visit.update({
        where: { id },
        data: { note: input.note, status: input.status },
      });
      return updatedRecord
    } catch (error) {
      throw error
    }
  }
}

module.exports = VisitModel;
