import { Router } from "express";
import { getGroup, getGroups } from "../controllers/groups.controller";

const router = Router();

router.get("/api/groups", getGroups);

router.get("/api/groups/:id", getGroup);

export default router;