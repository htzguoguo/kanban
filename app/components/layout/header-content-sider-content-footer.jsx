/**
 * Created by Administrator on 2017-12-12.
 */
import React from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import App from '../App.jsx';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

export default class HeaderContentSiderContentFooter extends React.Component {
  render () {
    return (
      <Layout className="layout" style={{height : '100vh'}}>
        <Header className="header">
            <div className="logo"></div>
            <Menu mode='horizontal' theme="dark"
                  defaultSelectedKeys={['2']}
                  style={{lineHeight : '64px'}}
            >
                <Menu.Item key="1">巡查上报</Menu.Item>
                <Menu.Item key="2">派单反馈</Menu.Item>
                <Menu.Item key="3">验收派单</Menu.Item>
            </Menu>
        </Header>
        <Content style={{padding : '0 50px'}}>
            <Breadcrumb style={{margin : '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
          <Layout style={{padding : '24px 0', background : '#fff'}}>
            <Sider style={{background : '#fff', width : 200}}>
                <Menu mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{height : '100%'}}
                >
                    <SubMenu key="sub1" title={<span><Icon type="user"/>添加</span>}>
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="swap"/>修改</span>}>
                        <Menu.Item key="4">option4</Menu.Item>
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="flag"/>删除</span>}>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                        <Menu.Item key="9">option9</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{padding : '0 24px', minHeight : '280px'}}>
                <App/>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign : 'center'}}>
            Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
