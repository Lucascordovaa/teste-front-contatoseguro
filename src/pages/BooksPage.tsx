import { useEffect, useState } from 'react';
import { Table, Button, Modal, Popconfirm } from 'antd';
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
    };

    const getAuthorName = (authorId: string) => {
        const author = authors.find((a) => a.id === authorId);
        return author?.name || 'Unknown Author';
    };

    const columns: ColumnsType<Book> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Author',
            dataIndex: 'author_id',
            render: (authorId: string) => getAuthorName(authorId),
        },
        {
            title: 'Pages',
            dataIndex: 'pages',
            render: (pages: number | undefined) => pages || '—',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt: string | undefined) =>
                createdAt ? dayjs(createdAt).format('DD/MM/YYYY HH:mm') : '—',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <>
                    <Button
                        style={{ marginRight: 8 }}
                        onClick={() => setSelectedBook(record)}
                    >
                        View
                    </Button>

                    <Popconfirm
                        title="Delete this book?"
                        description="Are you sure you want to delete this book?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h1>Books</h1>

            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading || authors.length === 0}
            >
                Create Book
            </Button>

            {!isLoading && authors.length === 0 && (
                <p style={{ color: 'red', marginBottom: 16 }}>
                    You need to create at least one author before creating a book.
                </p>
            )}

            <Table
                columns={columns}
                dataSource={books}
                rowKey="id"
                bordered
                loading={isLoading}
            />

            <CreateBookModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadBooks}
                authors={authors}
            />

            <Modal
                title="Book Details"
                open={!!selectedBook}
                onCancel={() => setSelectedBook(null)}
                footer={null}
            >
                <p><strong>Name:</strong> {selectedBook?.name}</p>
                <p><strong>Author:</strong> {getAuthorName(selectedBook?.author_id || '')}</p>
                <p><strong>Pages:</strong> {selectedBook?.pages || '—'}</p>
                <p><strong>Created
                    At:</strong> {selectedBook?.createdAt ? dayjs(selectedBook.createdAt).format('DD/MM/YYYY HH:mm') : '—'}
                </p>
            </Modal>
        </div>
    );
}

export default BooksPage;