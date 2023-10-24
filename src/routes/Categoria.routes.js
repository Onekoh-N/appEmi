import { Router } from "express";
import categoria from "../controllers/categoria.controller.js";

const router = Router();

router.get('/categorias', categoria.getCategoriaList);
router.get('/categoria/:id', categoria.getCategoria);
router.post('/categoria', categoria.createCategoria);
router.patch('/categoria/:id', categoria.updateCategoria);
router.delete('/categoria/:id', categoria.deleteCategoria);


export default router;