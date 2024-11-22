import { Router } from "express";
import { createSuggestion, getUserSuggestions, getGroupSuggestions, deleteSuggestionsByGroup, deleteSuggestionsByUser } from "../controllers/suggestions.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/api/suggestions", validateJWT, getUserSuggestions);

router.get("/api/suggestions/group/:id", validateJWT, getGroupSuggestions);

router.post("/api/suggestions", validateJWT, createSuggestion);

router.post("/api/suggestions/group/:id", validateJWT, createSuggestion);

router.delete("/api/suggestions/group/:id", validateJWT, deleteSuggestionsByGroup);

router.delete("/api/suggestions", validateJWT, deleteSuggestionsByUser);

router.all("/api/suggestions/*", (req, res) => {
    res.status(200).json({ movies: [], series: [] });
})

export default router;
