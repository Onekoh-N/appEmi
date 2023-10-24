import { Router } from "express";
import proveedor from "../controllers/proveedor.controller.js";

const router = Router();

router.get('/proveedores', proveedor.getProveedorList);
router.get('/proveedor/:id', proveedor.getProveedor);
router.post('/proveedor', proveedor.createProveedor);
router.patch('/proveedor/:id', proveedor.updateProveedor);
router.delete('/proveedor/:id', proveedor.deleteProveedor);


export default router;