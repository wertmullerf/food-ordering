const express = require("express");
const ingredienteRouter = express.Router();
import {
    agregarIngrediente,
    obtenerIngredientes,
    obtenerIngredientesExtras,
} from "../controllers/ingrediente.controller";

ingredienteRouter.post("/", agregarIngrediente);
ingredienteRouter.get("/extras", obtenerIngredientesExtras);
ingredienteRouter.get("/", obtenerIngredientes);
export default ingredienteRouter;
