const { optional } = require("zod");
const prisma = require("../shared/client");
const { hashPassword } = require("../utils/crypto");

class VisitModel {
  static async getAll(query) {
    const options = {
      where: {},
      orderBy: {
        fullName: 'asc'
      }
    };
    const { limit, offset} = query;
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
    return await prisma.visit.findFirst({ where: { id } });
  }

  static async getByIdNumber( idNumber ) {
    return await prisma.visit.findUnique({ where: { idNumber } });
  }

  static async create({
    date,        
    time ,       
    fullName, 
    idNumber,      
    entryDate,   
    visitReason, 
    department,
    status,
    note,           
    createdById,
  }) {
    return await prisma.visit.create({
      data: {date,        
        time,       
        fullName, 
        idNumber,      
        entryDate,   
        visitReason, 
        department,
        status,
        note,           
        createdById,}
    });
  }

  static async delete({ id }) {
    const deletedObject = await prisma.visit.delete({ where: { id } });
    return deletedObject ? true : false;
  }
//   Update All 
  static async update({id, input }) {
    const updatedRecord = await prisma.visit.update({
      where: { id },
      data: input,
    });
    return updatedRecord ? updatedRecord : false;
  }

//Update a Note
  static async updateNoteOrStatus({id, input }) {
    const updatedRecord = await prisma.visit.update({
      where: { id },
      data: {note: input.note, status: input.status},
    });
    return updatedRecord ? updatedRecord : false;
  }
}

module.exports = VisitModel;
