const z = require("zod");

const departmentEnum = z.enum(['ADMINISTRACION', 'PROVEEDORES', 'SERVICIO_AL_CLIENTE', 'VENTAS']);

const visitStatusEnum = z.enum(['EN_CURSO', 'FINALIZADO']);

const visitSchema = z.object({
  id: z.number().int().nonnegative(),
  date: z.date(),
  time: z.date(),
  fullName: z.string().min(3),
  idNumber: z.string().min(1),
  entryDate: z.date(),
  visitReason: z.string().min(3),
  department: departmentEnum,
  status: visitStatusEnum,
  note: z.string().optional(),
  createdById: z.number().int().nonnegative()
});

function validateVisit(input) {
    return visitSchema.safeParse(input);
  }
  
  function validatePartialVisit(input) {
    return visitSchema.partial().safeParse(input);
  }
  
  module.exports = {
    validateVisit,
    validatePartialVisit
  };