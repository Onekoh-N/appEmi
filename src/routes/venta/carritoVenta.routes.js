import { Router } from "express";
import CarritoVentas from "../../controllers/venta/carritoVenta.controller.js";

const router = Router();

router.get('/CarritosVentas', CarritoVentas.getCarritoVentasList);
router.get('/CarritoVentas/:id', CarritoVentas.getCarritoVentas);
router.post('/CarritoVentas', CarritoVentas.createCarritoVentas);
router.patch('/CarritoVentas/:id', CarritoVentas.updateCarritoVentas);
router.delete('/CarritoVentas/:id', CarritoVentas.deleteCarritoVentas);


export default router;