import { db } from './index.ts';
import type {Author} from '../types/author.ts';

const KEY = 'authors';

export const getAuthors = async (): Promise<Author[]> => {
    const authors = await db.getItem<Author[]>(KEY);
    return authors || [];
};

export const saveAuthors = async (authors: Author[]) => {
    await db.setItem(KEY, authors);
};

export const createAuthor = async (author: Author) => {
    const authors = await getAuthors();
    const updated = [...authors, author];
    await saveAuthors(updated);
    return author;
};

export const deleteAuthor = async (id: string) => {
    const authors = await getAuthors();
    const updated = authors.filter(a => a.id !== id);
    await saveAuthors(updated);
};