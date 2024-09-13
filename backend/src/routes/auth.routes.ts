import { Router } from "express";
import { revalidateToken, signIn } from "../controllers/auth.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/auth/renew", validateJWT, revalidateToken);

router.post("/api/auth/login", signIn);

export default router;