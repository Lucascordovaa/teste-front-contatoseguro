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
                            key: '/authors',
                            label: <Link to="/authors">Authors</Link>,
                        },
                        {
                            key: '/books',
                            label: <Link to="/books">Books</Link>,
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