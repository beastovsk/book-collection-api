import { Router } from "express";
import {
	addBook,
	getBooks,
	getBookById,
	updateBook,
	deleteBook,
} from "../controllers/bookController";
import { auth, isAdmin } from "../middleware/auth";

const router = Router();

router.post("/", auth, isAdmin, addBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", auth, isAdmin, updateBook);
router.delete("/:id", auth, isAdmin, deleteBook);

export default router;
