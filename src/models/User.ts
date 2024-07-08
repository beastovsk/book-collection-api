import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
	_id: string;
	username: string;
	password: string;
	email: string;
	role: number;
	comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
	_id: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: { type: Number, default: 1 }, // Default role
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = function (
	password: string
): Promise<boolean> {
	return bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);
