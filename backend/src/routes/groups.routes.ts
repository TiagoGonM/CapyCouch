import { Router } from "express";
import { createGroup, getGroup, getGroups } from "../controllers/groups.controller";

const router = Router();

router.get("/api/groups", getGroups);

router.get("/api/groups/:id", getGroup);

router.post("/api/groups", createGroup);

export default router;