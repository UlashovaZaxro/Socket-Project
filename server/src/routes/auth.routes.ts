import express from "express";
import { profile, login, register } from "../controllers/auth.controller.ts";
import { routeProtect } from "../middleware/routeProtect.ts";
import { upload } from "../utils/uploads.ts"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", routeProtect, upload.single("profileImage"), profile);

export default router;
