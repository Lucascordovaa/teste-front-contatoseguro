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
import { Space } from 'antd';
import { Flex } from 'antd';


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
            message.success('Autor excluído com sucesso');
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const columns: ColumnsType<Author> = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
                    <Button onClick={() => setSelectedAuthor(record)}>
                        Ver detalhes
                    </Button>

                    <Popconfirm
                        title="Excluir este autor?"
                        description="Tem certeza que deseja excluir este autor?"
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
                <h1 style={{ margin: 0 }}>Autores</h1>

                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Criar Autor
                </Button>
            </Flex>

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
                title="Detalhes do Autor"
                open={!!selectedAuthor}
                onCancel={() => setSelectedAuthor(null)}
                footer={null}
            >
                <p><strong>Nome:</strong> {selectedAuthor?.name}</p>
                <p><strong>Email:</strong> {selectedAuthor?.email || '—'}</p>
                <p><strong>Criado em:</strong> {selectedAuthor?.createdAt ? dayjs(selectedAuthor.createdAt).format('DD/MM/YYYY HH:mm') : '—'}
                </p>
            </Modal>
        </div>
    );
}

export default AuthorsPage;