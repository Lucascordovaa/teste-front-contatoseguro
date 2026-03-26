import { useEffect, useState } from 'react';
import {Table, Button, Modal} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Author } from '../types/author';
import { getAuthors } from '../storage/authorStorage';
import CreateAuthorModal from '../components/CreateAuthorModal';
import { deleteAuthorWithValidation } from '../services/authorService';
import { message } from 'antd';
import { Popconfirm } from 'antd';
import dayjs from 'dayjs';


function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadAuthors = async () => {
        setIsLoading(true);
        const data = await getAuthors();
        setAuthors(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteAuthorWithValidation(id);
            await loadAuthors();
            message.success('Author deleted successfully');
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const columns: ColumnsType<Author> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
                        onClick={() => setSelectedAuthor(record)}
                    >
                        View
                    </Button>

                    <Popconfirm
                        title="Delete this author?"
                        description="Are you sure you want to delete this author?"
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
            <h1>Authors</h1>

            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => setIsModalOpen(true)}
            >
                Create Author
            </Button>

            <Table
                columns={columns}
                dataSource={authors}
                rowKey="id"
                bordered
                loading={isLoading}
            />

            <CreateAuthorModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadAuthors}
            />

            <Modal
                title="Author Details"
                open={!!selectedAuthor}
                onCancel={() => setSelectedAuthor(null)}
                footer={null}
            >
                <p><strong>Name:</strong> {selectedAuthor?.name}</p>
                <p><strong>Email:</strong> {selectedAuthor?.email || '—'}</p>
                <p><strong>Created
                    At:</strong> {selectedAuthor?.createdAt ? dayjs(selectedAuthor.createdAt).format('DD/MM/YYYY HH:mm') : '—'}
                </p>
            </Modal>
        </div>
    );
}

export default AuthorsPage;