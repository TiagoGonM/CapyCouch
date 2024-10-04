import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  getGroupsByUser,
  updateGroup,
} from "../controllers/groups.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/global/groups", getGroups);

router.get("/api/groups/:id", getGroup);

// Endpoint para obtener los grupos relacionados a un ususario
router.get("/api/groups", validateJWT, getGroupsByUser);

router.post("/api/groups", validateJWT, createGroup);

router.put("/api/groups/:id", validateJWT, updateGroup);
router.delete("/api/groups/:id", validateJWT, deleteGroup);

export default router;
