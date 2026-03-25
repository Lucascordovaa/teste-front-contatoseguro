import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Author } from '../types/author';
import { getAuthors } from '../storage/authorStorage';
import CreateAuthorModal from '../components/CreateAuthorModal';

function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadAuthors = async () => {
        const data = await getAuthors();
        setAuthors(data);
    };

    useEffect(() => {
        loadAuthors();
    }, []);

    const columns: ColumnsType<Author> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
            />

            <CreateAuthorModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadAuthors}
            />
        </div>
    );
}

export default AuthorsPage;