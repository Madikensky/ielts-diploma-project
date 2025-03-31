"use client";

import { Button as PrimaryButton } from "@/components/ui/button";
import { usePathname } from "@/i18n/routing";
import { themeConfig } from "@/shared/theme/themeConfig";
import {
  AudioOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  CustomerServiceOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import Cookies from "js-cookie";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  onClick,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [timer, setTimer] = useState("3600 ");
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
      <Layout className="h-dvh overflow-auto">
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
                  icon: <CustomerServiceOutlined />,
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
                    Cookies.remove("access_token");
                    router.push(`/${locale}/auth`);
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
          <Content className="my-10 mx-6 min-h-[280px] bg-bgWhite rounded-xl overflow-auto">
            <div className="flex justify-between sticky top-0 bg-white p-6 z-10 shadow-sm items-center">
              <h2 className="font-semibold text-2xl">{title}</h2>
              <h2 className="text-xl">dd</h2>
            </div>
            {!children && (
              <div className="flex flex-col gap-6 p-6">
                {description && (
                  <p className="text-md text-start">{description}</p>
                )}
                {onClick && (
                  <PrimaryButton
                    onClick={onClick}
                    variant={"primary"}
                    className="w-[150px]"
                  >
                    {"Start"}
                  </PrimaryButton>
                )}
              </div>
            )}
            <div className="p-6">{children}</div>
          </Content>
          <div className="text-textCommon text-center pb-5">7Easy</div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
