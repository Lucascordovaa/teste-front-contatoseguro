//tipagem de livros
export interface Book {
    id: string;
    name: string;
    author_id: string;
    pages?: number;
    createdAt: string;
}