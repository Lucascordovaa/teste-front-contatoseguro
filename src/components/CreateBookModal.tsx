import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { createBook } from '../storage/bookStorage';
import { generateId } from '../utils/id';
import type { Author } from '../types/author';
import dayjs from 'dayjs';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    authors: Author[];
}

function CreateBookModal({ open, onClose, onSuccess, authors }: Props) {
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        await createBook({
            id: generateId(),
            name: values.name,
            author_id: values.author_id,
            pages: values.pages,
            createdAt: dayjs().toISOString(),
        });

        form.resetFields();
        onClose();
        onSuccess();
    };

    return (
        <Modal
            title="Criar livro"
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Título"
                    name="name"
                    rules={[{ required: true, message: 'Digite o nome do livro' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Autor"
                    name="author_id"
                    rules={[{ required: true, message: 'Selecione um autor' }]}
                >
                    <Select
                        placeholder="Selecione um autor"
                        options={authors.map((author) => ({
                            label: author.name,
                            value: author.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item label="Numero de páginas" name="pages">
                    <InputNumber style={{ width: '100%' }} min={1} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateBookModal;