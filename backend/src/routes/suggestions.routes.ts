import { Router } from "express";
import { createSuggestion, getUserSuggestions, getGroupSuggestions } from "../controllers/suggestions.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/suggestions", validateJWT, getUserSuggestions);

router.get("/api/suggestions/group/:id", validateJWT, getGroupSuggestions);

router.post("/api/suggestions", validateJWT, createSuggestion);

router.post("/api/suggestions/group/:id", validateJWT, createSuggestion);

export default router;
