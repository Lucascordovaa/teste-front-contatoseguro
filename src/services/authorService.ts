import { deleteAuthor } from '../storage/authorStorage';
import { getBooks } from '../storage/bookStorage';

export const deleteAuthorWithValidation = async (authorId: string) => {
    const books = await getBooks();

    const hasLinkedBooks = books.some((book) => book.author_id === authorId);

    if (hasLinkedBooks) {
        throw new Error('This author cannot be deleted because they are linked to one or more books.');
    }

    await deleteAuthor(authorId);
};