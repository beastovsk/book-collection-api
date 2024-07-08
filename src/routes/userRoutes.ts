import { Router } from "express";
import {
	register,
	login,
	updateRole,
	getCurrentUser,
} from "../controllers/userController";
import { auth, isAdmin } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);
router.put("/:id/role", auth, isAdmin, updateRole);

export default router;
