import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Database connection error:", error);
	});
