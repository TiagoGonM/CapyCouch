import { Router } from "express";
import { createSuggestion } from "../controllers/suggestions.controller";

const router = Router();

router.post("/api/suggestions", createSuggestion);

export default router;
