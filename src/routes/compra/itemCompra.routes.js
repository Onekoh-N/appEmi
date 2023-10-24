import { Router } from "express";
import itemCompra from "../../controllers/compra/itemCompra.controller.js";

const router = Router();

router.get('/itemsCompras', itemCompra.getItemCompraList);
router.get('/itemCompra/:id', itemCompra.getItemCompra);
router.post('/itemCompra', itemCompra.createItemCompra);
router.patch('/itemCompra/:id', itemCompra.updateItemCompra);
router.delete('/itemCompra/:id', itemCompra.deleteItemCompra);


export default router;