import { Router } from "express";
import { signIn } from "../controllers/auth.controller";
import { checkJWT, generateJWT } from "../helpers/jwt";

const router = Router();

router.get("/api/auth", async (req, res) => {
    const jwt = await generateJWT("66c7e700d675415dfd7ce87f");
    // checkJWT(jwt);
    res.json("hi");
});

router.post("/api/auth/login", signIn);

export default router;