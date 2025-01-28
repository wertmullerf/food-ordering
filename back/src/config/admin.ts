// config/admin.ts
import bcrypt from "bcryptjs";

const ADMIN = {
  email: "admin@example.com",
  passwordHash: bcrypt.hashSync("supersecurepassword", 10), // Hashea la contraseña
};

export default ADMIN;
