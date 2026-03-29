import { useEffect, useState } from 'react';
import {Table, Button, Modal, Popconfirm, message, Space, Flex} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Book } from '../types/book';
import type { Author } from '../types/author';
import { getBooks, deleteBook } from '../storage/bookStorage';
import { getAuthors } from '../storage/authorStorage';
import CreateBookModal from '../components/CreateBookModal';
import dayjs from 'dayjs';

function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadBooks = async () => {
        const data = await getBooks();
        setBooks(data);
    };

    const loadAuthors = async () => {
        const data = await getAuthors();
        setAuthors(data);
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);

            await Promise.all([
                loadBooks(),
                loadAuthors(),
            ]);

            setIsLoading(false);
        };

        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBooks();
        message.success('Livro excluído com sucesso');
    };

    const getAuthorName = (authorId: string) => {
        const author = authors.find((a) => a.id === authorId);
        return author?.name || 'Autor Desconhecido';
    };

    const columns: ColumnsType<Book> = [
        {
            title: 'Título',
            dataIndex: 'name',
        },
        {
            title: 'Autor',
            dataIndex: 'author_id',
            render: (authorId: string) => getAuthorName(authorId),
        },
        {
            title: 'Número de páginas',
            dataIndex: 'pages',
            render: (pages: number | undefined) => pages || '—',
        },
        {
            title: 'Criado em',
            dataIndex: 'createdAt',
            render: (createdAt: string | undefined) =>
                createdAt ? dayjs(createdAt).format('DD/MM/YYYY HH:mm') : '—',
        },
        {
            title: 'Ações',
            render: (_, record) => (
                <Space>
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => setSelectedBook(record)}
                    >
                        Ver detalhes
                    </Button>

                    <Popconfirm
                        title="Excluir este livro?"
                        description="Tem certeza que deseja excluir este livro?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Confirmar"
                        cancelText="Cancelar"
                    >
                        <Button danger>Excluir</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{padding: 24, maxWidth: 1400, margin: '0 auto'}}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <h1 style={{ margin: 0 }}>Livros</h1>

                <Button
                type="primary"
                style={{marginBottom: 16}}
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading || authors.length === 0}
                >
                Criar Livro
                </Button>
            </Flex>

            {!isLoading && authors.length === 0 && (
                <p style={{color: 'red', marginBottom: 16}}>
                    Você precisa criar ao menos um autor para criar um livro.
                </p>
            )}

            <Table
                columns={columns}
                dataSource={books}
                rowKey="id"
                bordered
                loading={isLoading}
                scroll={{ x: 'max-content' }}
            />

            <CreateBookModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadBooks}
                authors={authors}
            />

            <Modal
                title="Detalhes do livro"
                open={!!selectedBook}
                onCancel={() => setSelectedBook(null)}
                footer={null}
            >
                <p><strong>Título:</strong> {selectedBook?.name}</p>
                <p><strong>Autor:</strong> {getAuthorName(selectedBook?.author_id || '')}</p>
                <p><strong>Número de páginas:</strong> {selectedBook?.pages || '—'}</p>
                <p><strong>Criado em:</strong> {selectedBook?.createdAt ? dayjs(selectedBook.createdAt).format('DD/MM/YYYY HH:mm') : '—'}
                </p>
            </Modal>
        </div>
    );
}

export default BooksPage;