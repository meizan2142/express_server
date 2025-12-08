import { Router } from "express";
import { todoControllers } from "./todo.controllers";

const router = Router();

router.post("/", todoControllers.createTodo)

router.get("/", todoControllers.getTodo)

export const todoRoutes = router;