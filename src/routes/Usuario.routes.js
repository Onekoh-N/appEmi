import { Router } from "express";
import usuario from "../controllers/usuario.controller.js";

const router = Router();

router.get('/usuarios', usuario.getUsuarioList);
router.get('/usuario/:id', usuario.getUsuario);
router.post('/usuario', usuario.createUsuario);
router.patch('/usuario/:id', usuario.updateUsuario);
router.delete('/usuario/:id', usuario.deleteUsuario);


export default router;