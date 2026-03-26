import { Modal, Form, Input } from 'antd';
import { createAuthor } from '../storage/authorStorage';
import { generateId } from '../utils/id';
import dayjs from 'dayjs';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function CreateAuthorModal({ open, onClose, onSuccess }: Props) {
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        await createAuthor({
            id: generateId(),
            name: values.name,
            email: values.email,
            createdAt: dayjs().toISOString(),
        });

        form.resetFields();
        onClose();
        onSuccess();
    };

    return (
        <Modal
            title="Criar autor"
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Digite um nome' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateAuthorModal;