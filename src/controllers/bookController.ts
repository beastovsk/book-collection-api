import { Request, Response } from "express";
import { Book } from "../models/Book";

export const addBook = async (req: Request, res: Response) => {
	const { title, author, publicationDate, genres } = req.body;
	try {
		const book = new Book({ title, author, publicationDate, genres });
		await book.save();
		res.status(201).send(book);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const getBooks = async (_req: Request, res: Response) => {
	try {
		const books = await Book.find();
		res.send(books);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const getBookById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).send();
		}
		res.send(book);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const updateBook = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, author, publicationDate, genres } = req.body;
	try {
		const book = await Book.findByIdAndUpdate(
			id,
			{ title, author, publicationDate, genres },
			{ new: true }
		);
		if (!book) {
			return res.status(404).send();
		}
		res.send(book);
	} catch (error) {
		res.status(400).send(error);
	}
};

export const deleteBook = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const book = await Book.findByIdAndDelete(id);
		if (!book) {
			return res.status(404).send();
		}
		res.send(book);
	} catch (error) {
		res.status(500).send(error);
	}
};
