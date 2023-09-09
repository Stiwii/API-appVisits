const z = require("zod");

const userRoleEnum = z.enum(['RECEPCION', 'SUPERVISOR']);

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4), // Es solo un ejemplo; considera reglas más seguras.
  role: userRoleEnum
});

function validateUser(input) {
  return userSchema.safeParse(input);
}

function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}

module.exports = {
  validateUser,
  validatePartialUser
};