import { Router } from "express";
import itemVenta from "../../controllers/venta/itemVenta.controller.js";

const router = Router();

router.get('/itemsVentas', itemVenta.getItemVentaList);
router.get('/itemVenta/:id', itemVenta.getItemVenta);
router.post('/itemVenta', itemVenta.createItemVenta);
router.patch('/itemVenta/:id', itemVenta.updateItemVenta);
router.delete('/itemVenta/:id', itemVenta.deleteItemVenta);


export default router;