// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Puedes definir un tipo más específico si lo deseas, por ejemplo { email: string }
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  //.authorization?.split(" ")[1]; // Bearer <token> Divide el encabezado por espacios y toma la segunda parte (que es el token). Si no hay un encabezado Authorization, el valor será undefined.
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    // Verifica el token con el secreto
    const decoded = jwt.verify(token, JWT_SECRET!) as {
      email: string;
    };

    // Adjunta los datos del usuario al objeto de la solicitud
    req.user = decoded;

    // Continúa con la siguiente función
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};
