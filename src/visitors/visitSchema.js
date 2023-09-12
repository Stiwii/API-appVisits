const z = require("zod");

const departmentEnum = z.enum(['ADMINISTRACION', 'PROVEEDORES', 'SERVICIO_AL_CLIENTE', 'VENTAS']);

const visitStatusEnum = z.enum(['EN_CURSO', 'FINALIZADO']);

const visitSchema = z.object({
  fullName: z.string().min(3),
  idNumber: z.string().length(10),
  entryDate: z.string().pipe( z.coerce.date() ),
  visitReason: z.string().min(3),
  department: departmentEnum,
  status: visitStatusEnum,
  note: z.string().optional(),
  // createdById: z.string()
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