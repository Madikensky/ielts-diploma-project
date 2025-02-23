"use client";

import React, { ReactNode, useState } from "react";
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
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import "@ant-design/v5-patch-for-react-19";
import { useLocale } from "next-intl";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const pathKeys = [
    "/home",
    "/speaking",
    "/writing",
    "/reading",
    "/listening",
    "/profile",
  ];

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="h-dvh">
        <Sider trigger={null} collapsible collapsed={collapsed} width={230}>
          <div className="flex flex-col h-full">
            <Menu
              mode="vertical"
              defaultSelectedKeys={["0"]}
              className="flex-1 !p-3 flex flex-col gap-3"
              selectedKeys={[pathKeys.indexOf(pathname).toString()]}
              items={[
                {
                  key: "0",
                  label: "Home",
                  onClick: () => router.push(`/${locale}/home`),
                },
                {
                  key: "1",
                  icon: <AudioOutlined />,
                  label: "Speaking",
                  onClick: () => router.push(`/${locale}/speaking`),
                },
                {
                  key: "2",
                  icon: <EditOutlined />,
                  label: "Writing",
                  onClick: () => router.push(`/${locale}/writing`),
                },
                {
                  key: "3",
                  icon: <ReadOutlined />,
                  label: "Reading",
                  onClick: () => router.push(`/${locale}/reading/`),
                },
                {
                  key: "4",
                  icon: <SoundOutlined />,
                  label: "Listening",
                  onClick: () => router.push(`/${locale}/listening`),
                },
                {
                  key: "5",
                  icon: <UserOutlined />,
                  label: "Profile",
                  onClick: () => router.push(`/${locale}/profile`),
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
                  onClick: () => {
                    console.log("log out");
                  },
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
          <Content className="my-10 mx-6 p-6 min-h-[280px] bg-bgWhite rounded-xl overflow-y-auto">
            {children}
          </Content>
          <div className="text-textCommon text-center pb-5">7Easy</div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
