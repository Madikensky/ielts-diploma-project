"use client";

import { Button as PrimaryButton } from "@/components/ui/button";
import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";
import { themeConfig } from "@/shared/theme/themeConfig";
import { Loader } from "@/shared/ui/Loader";
import {
  AudioOutlined,
  CustomerServiceOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  score?: number;
  isSubmitted?: boolean;
  onClick?: () => void;
  isStarted?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  score,
  isStarted,
  isSubmitted,
  onClick,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(0);
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

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        if (!score && !isSubmitted) {
          setSeconds((prev) => prev + 1)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isStarted, score, isSubmitted])

  useEffect(() => {
    if (isSubmitted) {
      setIsDataSubmitted(isSubmitted)
    }
  }, [isSubmitted])

  const formatTime = (numTime: number) => {
    const hours = Math.floor(numTime / 3600);
    const minutes = Math.floor((numTime % 3600) / 60);
    const seconds = numTime % 60;

    const pad = (num: number) => String(num).padStart(2, "0")
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return (
    <ConfigProvider theme={themeConfig}>

      <Dialog open={isDataSubmitted} onOpenChange={setIsDataSubmitted}>
        <DialogContent className="text-textCommon  border-borderCommon rounded-lg">
          <DialogHeader>
            <DialogTitle>Congratulations!🎉 You've finished your exam.</DialogTitle>
            <DialogDescription>
              {score && <h2>Your score: {score}</h2>}
              The timer has been paused. Please wait while we review your answers. Once the review is complete, you will be able to view any mistakes or return to the main menu to continue your practice. ❤️
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


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
                  onClick: () => {
                    if (pathname !== `/home`) {
                      setIsLoading(true);
                      router.push(`/${locale}/home`);
                    }
                  },
                },
                {
                  key: "1",
                  icon: <AudioOutlined />,
                  label: "Speaking",
                  onClick: () => {
                    if (pathname !== `/speaking`) {
                      setIsLoading(true);
                      router.push(`/${locale}/speaking`);
                    }
                  },
                },
                {
                  key: "2",
                  icon: <EditOutlined />,
                  label: "Writing",
                  onClick: () => {
                    if (pathname !== `/writing`) {
                      setIsLoading(true);
                      router.push(`/${locale}/writing`);
                    }
                  },
                },
                {
                  key: "3",
                  icon: <ReadOutlined />,
                  label: "Reading",
                  onClick: () => {
                    if (pathname !== `/reading`) {
                      setIsLoading(true);
                      router.push(`/${locale}/reading/`);
                    }
                  },
                },
                {
                  key: "4",
                  icon: <CustomerServiceOutlined />,
                  label: "Listening",
                  onClick: () => {
                    if (pathname !== `/listening`) {
                      setIsLoading(true);
                      router.push(`/${locale}/listening`);
                    }
                  },
                },
                {
                  key: "5",
                  icon: <UserOutlined />,
                  label: "Profile",
                  onClick: () => {
                    if (pathname !== `/profile`) {
                      setIsLoading(true);
                      router.push(`/${locale}/profile`);
                    }
                  },
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
          {isLoading ? (
            <Loader />
          ) : (
            <Content className="my-10 mx-6 min-h-[280px] bg-bgWhite rounded-xl overflow-auto">
              <div className="flex justify-between font-semibold sticky top-0 bg-white p-6 z-10 shadow-sm items-center">
                <h2 className="font-semibold text-2xl w-full flex justify-between">
                  <div>{title}</div>
                  {isStarted && <div className={cn(isSubmitted && 'text-gray-400')}>Timer: {formatTime(seconds)}</div>}
                </h2>
              </div>
              {!children && (
                <div className="flex flex-col gap-6 p-6">
                  {<p className="text-md text-start">{description}</p>}
                  {onClick && (
                    <PrimaryButton
                      onClick={() => {
                        onClick();
                      }}
                      variant={"primary"}
                      className="w-[150px]"
                    >
                      {"Start"}
                    </PrimaryButton>
                  )}
                </div>
              )}
              <div className="p-6 border-red-500 h-full">{children}</div>
            </Content>
          )}
          <div className="text-textCommon text-center pb-5">7Easy</div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
