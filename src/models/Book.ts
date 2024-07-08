import { Schema, model, Document } from "mongoose";

interface IBook extends Document {
	title: string;
	author: string;
	publicationDate: Date;
	genres: string[];
}

const bookSchema = new Schema<IBook>({
	title: { type: String, required: true },
	author: { type: String, required: true },
	publicationDate: { type: Date, required: true },
	genres: { type: [String], required: true },
});

export const Book = model<IBook>("Book", bookSchema);
