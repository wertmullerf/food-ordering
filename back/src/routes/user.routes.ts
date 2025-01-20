import express from "express";
const userRouter = express.Router();

import {
  obtenerUsuarios,
  obtenerUsuarioId,
  editarUsuario,
  eliminarUsuario,
  //funciones de db
} from "../controllers/user.controller";

userRouter.get("/", obtenerUsuarios);
userRouter.get("/:id", obtenerUsuarioId);
userRouter.patch("/:id", editarUsuario);
userRouter.delete("/:id", eliminarUsuario);
//userRouter.post("/", agregarUsuario);

export default userRouter;
