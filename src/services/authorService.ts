import { deleteAuthor } from '../storage/authorStorage';
import { getBooks } from '../storage/bookStorage';

export const deleteAuthorWithValidation = async (authorId: string) => {
    const books = await getBooks();

    const hasLinkedBooks = books.some((book) => book.author_id === authorId);

    if (hasLinkedBooks) {
        throw new Error('Este autor não pode ser excluído pois há um ou mais livros vinculados a ele');
    }

    await deleteAuthor(authorId);
};