import { Router } from "express";
import { getUsers } from "../controllers/users.controller";

const router = Router();

router.get("/api/users", getUsers);

router.post("/api/users", (req, res) => {});

router.put("/api/user/:id", (req, res) => {});

router.delete("/api/user/:id", (req, res) => {});

export default router;
