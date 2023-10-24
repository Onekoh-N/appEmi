import { Router } from "express";
import producto from "../controllers/producto.controller.js";

const router = Router();

router.get('/productos', producto.getProductoList);
router.get('/producto/:id', producto.getProducto);
router.post('/producto', producto.createProducto);
router.patch('/producto/:id', producto.updateProducto);
router.delete('/producto/:id', producto.deleteProducto);


export default router;