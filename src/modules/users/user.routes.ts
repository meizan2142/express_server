import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.createUser)

router.get("/", userControllers.getUser)

router.get("/:id", userControllers.getSingleUser)

router.put("/:id", userControllers.updateSingleUser)

router.delete("/:id", userControllers.deleteSingleUser)

export const userRoutes = router;``