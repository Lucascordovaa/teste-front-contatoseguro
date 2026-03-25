import { db } from './index.ts';
import type { Book } from '../types/book.ts';

const KEY = 'books';

export const getBooks = async (): Promise<Book[]> => {
    const books = await db.getItem<Book[]>(KEY);
    return books || [];
};

export const saveBooks = async (books: Book[]) => {
    await db.setItem(KEY, books);
};

export const createBook = async (book: Book) => {
    const books = await getBooks();
    const updated = [...books, book];
    await saveBooks(updated);
    return book;
};

export const getBookById = async (id: string) => {
    const books = await getBooks();
    return books.find((b) => b.id === id) || null;
};

export const deleteBook = async (id: string) => {
    const books = await getBooks();
    const updated = books.filter((b) => b.id !== id);
    await saveBooks(updated);
};