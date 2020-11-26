import React, { FunctionComponent } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

interface Props {}

const DashboardRender: FunctionComponent<Props> = props => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='1'>nav 1</Menu.Item>
        <Menu.Item key='2'>nav 2</Menu.Item>
        <Menu.Item key='3'>nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content
      className='site-layout'
      style={{ padding: '0 50px', marginTop: 64 }}
    >
      {props.children}
    </Content>
  </Layout>
);

export default DashboardRender;
