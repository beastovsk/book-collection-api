import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface AuthRequest extends Request {
	user?: any;
}

export const auth = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).send({ error: "Please authenticate." });
	}

	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});
		if (!user) {
			throw new Error();
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Please authenticate." });
	}
};

export const isAdmin = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.user?.role !== 2) {
		return res.status(403).send({ error: "Access denied." });
	}
	next();
};
