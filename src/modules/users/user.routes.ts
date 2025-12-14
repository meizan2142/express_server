import { Router } from "express";
import { userControllers } from "./user.controller";
import { logger } from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userControllers.createUser)

router.get("/", logger, auth("admin"), userControllers.getUser)

router.get("/:id", userControllers.getSingleUser)

router.put("/:id", userControllers.updateSingleUser)

router.delete("/:id", userControllers.deleteSingleUser)

export const userRoutes = router;