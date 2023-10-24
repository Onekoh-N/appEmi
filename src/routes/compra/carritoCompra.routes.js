import { Router } from "express";
import CarritoCompras from "../../controllers/compra/carritoCompra.controller.js";

const router = Router();

router.get('/CarritosCompras', CarritoCompras.getCarritoComprasList);
router.get('/CarritoCompras/:id', CarritoCompras.getCarritoCompras);
router.post('/CarritoCompras', CarritoCompras.createCarritoCompras);
router.patch('/CarritoCompras/:id', CarritoCompras.updateCarritoCompras);
router.delete('/CarritoCompras/:id', CarritoCompras.deleteCarritoCompras);


export default router;