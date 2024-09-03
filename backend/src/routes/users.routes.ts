import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUserById,
} from "../controllers/users.controller";

const router = Router();

router.get("/api/users", getUsers);

router.get("api/users/:id", getUser);

router.post("/api/users", createUser);

router.put("/api/user/:id", updateUserById);

router.delete("/api/user/:id", deleteUser);

export default router;
