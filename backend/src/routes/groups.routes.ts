import { Router } from "express";
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../controllers/groups.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/groups", getGroups);

router.get("/api/groups/:id", getGroup);

router.post("/api/groups", validateJWT, createGroup);

router.put("/api/groups/:id", validateJWT, updateGroup);
router.delete("/api/groups/:id", validateJWT, deleteGroup);

export default router;