import { Router } from "express";
import { createSuggestion } from "../controllers/suggestions.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.post("/api/suggestions", validateJWT, createSuggestion);

export default router;
