import { Router } from "express";
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from "../controllers/groups.controller";

const router = Router();

router.get("/api/groups", getGroups);

router.get("/api/groups/:id", getGroup);

router.post("/api/groups", createGroup);

router.put("/api/groups/:id", updateGroup);
router.delete("/api/groups/:id", deleteGroup);

export default router;