import express from "express";
const userRouter = express.Router();

import {
  obtenerUsuarios,
  obtenerUsuarioId,
  editarUsuario,
  eliminarUsuario,
  agregarUsuario,
  //funciones de db
} from "../controllers/userController";

userRouter.post("/", obtenerUsuarios);
userRouter.get("/:id", obtenerUsuarioId);
userRouter.get("/editar/:userId", editarUsuario);
userRouter.get("/eliminar/:userId", eliminarUsuario);
//userRouter.post("/", agregarUsuario);

export default userRouter;
