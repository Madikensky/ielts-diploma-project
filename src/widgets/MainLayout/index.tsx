import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  SoundOutlined,
  UserOutlined,
  AudioOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, ConfigProvider } from "antd";
import { themeConfig } from "@/shared/theme/themeConfig";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="h-dvh">
        <Sider trigger={null} collapsible collapsed={collapsed} width={230}>
          <div className="flex flex-col h-full">
            <Menu
              mode="vertical"
              defaultSelectedKeys={["0"]}
              className="flex-1 !p-3 flex flex-col gap-3"
              items={[
                {
                  key: "0",
                  label: "Home",
                },
                {
                  key: "1",
                  icon: <AudioOutlined />,
                  label: "Speaking",
                },
                {
                  key: "2",
                  icon: <EditOutlined />,
                  label: "Writing",
                },
                {
                  key: "3",
                  icon: <ReadOutlined />,
                  label: "Reading",
                },
                {
                  key: "4",
                  icon: <SoundOutlined />,
                  label: "Listening",
                },
                {
                  key: "5",
                  icon: <UserOutlined />,
                  label: "Profile",
                },
              ]}
            />
            <Menu
              mode="vertical"
              className="!p-3 mt-auto"
              items={[
                {
                  key: "logout",
                  icon: <UserDeleteOutlined />,
                  label: "Log out",
                  danger: true,
                },
              ]}
            />
          </div>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
