import { Router } from "express";
import { todoControllers } from "./todo.controllers";

const router = Router();

router.post("/", todoControllers.createTodo)

router.get("/", todoControllers.getTodo)

router.get("/:id", todoControllers.getSingleTodo)

router.put("/:id", todoControllers.updateSingleTodo)

router.delete("/:id", todoControllers.deleteSingleTodo)

export const todoRoutes = router;