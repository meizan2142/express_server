import { Router } from "express";
import { todoControllers } from "./todo.controllers";

const router = Router();

router.post("/", todoControllers.createTodo)

export const todoRoutes = router;