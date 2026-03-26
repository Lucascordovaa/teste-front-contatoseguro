//layout geral da aplicação
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

function AppLayout() {
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/autores',
                            label: <Link to="/autores">Autores</Link>,
                        },
                        {
                            key: '/livros',
                            label: <Link to="/livros">Livros</Link>,
                        },
                    ]}
                />
            </Header>

            <Content style={{ padding: '24px' }}>
                <Outlet />
            </Content>
        </Layout>
    );
}

export default AppLayout;