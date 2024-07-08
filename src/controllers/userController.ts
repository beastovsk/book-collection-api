import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
	user: typeof User;
}

export const register = async (req: Request, res: Response) => {
	const { username, password, email } = req.body;
	try {
		const user = new User({ username, password, email });
		await user.save();
		res.status(201).send({ user });
	} catch (error) {
		res.status(400).send(error);
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(400).send({ error: "Invalid credentials." });
		}
		const token = jwt.sign(
			{ _id: user._id.toString() },
			process.env.JWT_SECRET!,
			{
				expiresIn: "7d",
			}
		);
		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
	res.send(req.user);
};

export const updateRole = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { role } = req.body;
	try {
		const user = await User.findByIdAndUpdate(id, { role }, { new: true });
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};
