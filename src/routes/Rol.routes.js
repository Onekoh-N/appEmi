import { Router } from "express";
import rol from "../controllers/rol.controller.js";

const router = Router();

router.get('/roles', rol.getRolList);
router.get('/rol/:id', rol.getRol);
router.post('/rol', rol.createRol);
router.patch('/rol/:id', rol.updateRol);
router.delete('/rol/:id', rol.deleteRol);


export default router;