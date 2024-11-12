import { Router } from "express";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUserById,
} from "../controllers/users.controller";

import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/users", validateJWT, getUsers);

router.get("/api/users/:id", getUser);

router.post("/api/users", createUser);

router.put("/api/users/:id", updateUserById);

router.delete("/api/users/:id", validateJWT, deleteUser);

export default router;
