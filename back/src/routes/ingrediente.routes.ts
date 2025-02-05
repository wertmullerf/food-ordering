const express = require("express");
const ingredienteRouter = express.Router();
import { agregarIngrediente } from "../controllers/ingrediente.controller";

ingredienteRouter.post("/", agregarIngrediente);

export default ingredienteRouter;
