import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import ADMIN from "../config/admin";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verificación de las credenciales
  if (
    email === ADMIN.email &&
    (await bcrypt.compare(password, ADMIN.passwordHash))
  ) {
    // Generar el token JWT
    const token = jwt.sign({ email }, JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
    return;
  } else {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
};
