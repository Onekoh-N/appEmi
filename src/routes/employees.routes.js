import { Router } from "express";
import employee from "../controllers/employees.controller.js";

const router = Router();

router.get('/employees', employee.getEmployeeList);
router.get('/employees/:id', employee.getEmployee);
router.post('/employees', employee.createEmployee);
router.patch('/employees/:id', employee.updateEmployee);
router.delete('/employees/:id', employee.deleteEmployee);


export default router;