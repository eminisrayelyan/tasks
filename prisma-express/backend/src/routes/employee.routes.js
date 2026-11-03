import { Router } from "express";
import { getEmployees } from "../controllers/employee.controller.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/", validate, getEmployees);

export default router;