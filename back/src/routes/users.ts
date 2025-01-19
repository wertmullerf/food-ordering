import express from "express";
const router = express.Router();

const {
  obtenerUsuarios,
  obtenerUsuarioId,
  editarUsuario,
  eliminarUsuario,
  agregarUsuario,
  //funciones de db
} = require("../controller/orderController");

router.post("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioId);
router.get("/editar/:userId", editarUsuario);
router.get("/eliminar/:userId", eliminarUsuario);
router.post("/", agregarUsuario);

module.exports = router;
