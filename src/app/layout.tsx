"use client";

import { Inter} from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { Layout, Menu, Button, ConfigProvider, MenuProps } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  BookOutlined,
  FileOutlined,
  HomeOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Content, Footer as AntFooter, Header } from "antd/es/layout/layout";
import { debounce } from "lodash"; 

// ------------------------------
// 常量与类型定义（集中管理）
// ------------------------------

// 路由配置（统一管理路径与菜单映射）
type RouteItem = {
  key: string;
  path: string;
  label: string;
  icon: React.ReactNode;
};

const routes: RouteItem[] = [
  { key: "1", path: "/", label: "首页", icon: <HomeOutlined /> },
  { key: "2", path: "/articles", label: "技术文章", icon: <FileOutlined /> },
  { key: "3", path: "/questions", label: "问答社区", icon: <BookOutlined /> },
];

// 样式常量
const STYLES = {
  headerBg: "#141a29",
  mobileMenuBg: "#141a29",
  footerBg: "#141a29",
  textColor: "#999",
  activeColor: "#1677ff",
  white: "#fff",
};

const inter = Inter({ subsets: ["latin"] });

// ------------------------------
// 工具函数（提取重复逻辑）
// ------------------------------

/**
 * 标准化路径（移除尾部斜杠，便于匹配）
 */
const normalizePath = (pathname: string): string => {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

/**
 * 根据当前路径匹配对应的菜单key
 */
const getMatchedMenuKey = (pathname: string): string => {
  if (!pathname) return "1"; // 默认首页

  const normalized = normalizePath(pathname);
  // 匹配规则：完全一致 或 子路径（如/articles/123匹配/articles）
  return (
    routes.find(
      (route) => normalized === route.path || normalized.startsWith(`${route.path}/`)
    )?.key || "1"
  );
};

// ------------------------------
// 页脚组件（拆分独立组件）
// ------------------------------

const AppFooter = () => (
  <AntFooter style={{ backgroundColor: STYLES.footerBg, color: STYLES.textColor }} className="py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">TechBlog</h3>
          <p className="mb-4">分享前沿技术、解决编程难题、交流开发经验</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/lossofstruggle"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 1024 1024" version="1.1" className="w-6 h-6">
                <path
                  d="M347.8 794.8c0 4-4.6 7.2-10.4 7.2-6.6 0.6-11.2-2.6-11.2-7.2 0-4 4.6-7.2 10.4-7.2 6-0.6 11.2 2.6 11.2 7.2z m-62.2-9c-1.4 4 2.6 8.6 8.6 9.8 5.2 2 11.2 0 12.4-4s-2.6-8.6-8.6-10.4c-5.2-1.4-11 0.6-12.4 4.6z m88.4-3.4c-5.8 1.4-9.8 5.2-9.2 9.8 0.6 4 5.8 6.6 11.8 5.2 5.8-1.4 9.8-5.2 9.2-9.2-0.6-3.8-6-6.4-11.8-5.8zM505.6 16C228.2 16 16 226.6 16 504c0 221.8 139.6 411.6 339 478.4 25.6 4.6 34.6-11.2 34.6-24.2 0-12.4-0.6-80.8-0.6-122.8 0 0-140 30-169.4-59.6 0 0-22.8-58.2-55.6-73.2 0 0-45.8-31.4 3.2-30.8 0 0 49.8 4 77.2 51.6 43.8 77.2 117.2 55 145.8 41.8 4.6-32 17.6-54.2 32-67.4-111.8-12.4-224.6-28.6-224.6-221 0-55 15.2-82.6 47.2-117.8-5.2-13-22.2-66.6 5.2-135.8 41.8-13 138 54 138 54 40-11.2 83-17 125.6-17s85.6 5.8 125.6 17c0 0 96.2-67.2 138-54 27.4 69.4 10.4 122.8 5.2 135.8 32 35.4 51.6 63 51.6 117.8 0 193-117.8 208.4-229.6 221 18.4 15.8 34 45.8 34 92.8 0 67.4-0.6 150.8-0.6 167.2 0 13 9.2 28.8 34.6 24.2C872.4 915.6 1008 725.8 1008 504 1008 226.6 783 16 505.6 16zM210.4 705.8c-2.6 2-2 6.6 1.4 10.4 3.2 3.2 7.8 4.6 10.4 2 2.6-2 2-6.6-1.4-10.4-3.2-3.2-7.8-4.6-10.4-2z m-21.6-16.2c-1.4 2.6 0.6 5.8 4.6 7.8 3.2 2 7.2 1.4 8.6-1.4 1.4-2.6-0.6-5.8-4.6-7.8-4-1.2-7.2-0.6-8.6 1.4z m64.8 71.2c-3.2 2.6-2 8.6 2.6 12.4 4.6 4.6 10.4 5.2 13 2 2.6-2.6 1.4-8.6-2.6-12.4-4.4-4.6-10.4-5.2-13-2z m-22.8-29.4c-3.2 2-3.2 7.2 0 11.8 3.2 4.6 8.6 6.6 11.2 4.6 3.2-2.6 3.2-7.8 0-12.4-2.8-4.6-8-6.6-11.2-4z"
                  fill={STYLES.activeColor}
                ></path>
              </svg>
            </a>
            <a
              href="mailto:799273114qian@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Gmail"
            >
              <svg viewBox="0 0 1024 1024" version="1.1" className="w-7 h-7">
                <path
                  d="M853.333333 170.666667H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v512c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V256c0-46.933333-38.4-85.333333-85.333334-85.333333z m0 597.333333h-85.333333V392.533333L512 554.666667 256 392.533333V768H170.666667V256h51.2l290.133333 179.2L802.133333 256H853.333333v512z"
                  fill={STYLES.activeColor}
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">导航链接</h4>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.key}>
                <Link
                  href={route.path}
                  className="hover:text-white transition-colors"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">订阅更新</h4>
          <p className="mb-4">订阅获取最新技术文章和开发技巧</p>
          <div className="flex">
            <input
              type="email"
              placeholder="您的邮箱地址"
              className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="button" // 避免默认表单提交
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
            >
              订阅
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p>© {new Date().getFullYear()} TechBlog. 保留所有权利。</p>
      </div>
    </div>
  </AntFooter>
);

// ------------------------------
// 主布局组件
// ------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 菜单配置（基于路由自动生成）
  const menuItems: MenuProps["items"] = routes.map((route) => ({
    key: route.key,
    label: route.label,
    icon: route.icon,
  }));

  // 状态管理
  const [currentMenuKey, setCurrentMenuKey] = useState("1");
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || "/";

  // 窗口大小变化处理（添加防抖优化）
  const handleResize = useCallback(
    debounce(() => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
      if (!isMobile) setMobileMenuVisible(false); // 非移动设备关闭菜单
    }, 100), // 100ms防抖
    []
  );

  // 初始化窗口大小监听
  useEffect(() => {
    handleResize(); // 初始计算
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // 路径变化时更新菜单选中状态
  useEffect(() => {
    setCurrentMenuKey(getMatchedMenuKey(pathname));
  }, [pathname]);

  // 菜单点击处理
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const { key } = e;
    setCurrentMenuKey(key);
    // 跳转到对应路径
    const targetPath = routes.find(route => route.key === key)?.path || "/";
    router.push(targetPath);
    setMobileMenuVisible(false); // 点击后关闭移动菜单
  };

  return (
    <html lang="zh-CN">
      <head>
        <title>TechBlog - 技术博客与社区</title>
        <meta
          name="description"
          content="分享前沿技术、解决编程难题、交流开发经验"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "#999",
                itemSelectedColor: STYLES.activeColor,
              },
            },
          }}
        >
          <Layout>
            {/* 顶部导航 */}
            <Header
              style={{ backgroundColor: STYLES.headerBg, color: STYLES.white }}
              className="fixed top-0 left-0 right-0 flex justify-between items-center z-50 h-16 px-4"
            >
              <div className="flex items-center w-full">
                <div className="text-2xl font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Tech
                  </span>
                  Blog
                </div>

                {/* 桌面端菜单 */}
                <div className={`${isMobile ? "hidden" : "flex-1 ml-8"}`}>
                  <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[currentMenuKey]}
                    mode="horizontal"
                    items={menuItems}
                    style={{ backgroundColor: STYLES.headerBg }}
                    className="border-b-0"
                  />
                </div>
              </div>

              {/* 移动端菜单按钮 */}
              {isMobile && (
                <Button
                  type="text"
                  className="text-white"
                  icon={mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
                  onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                />
              )}
            </Header>

            {/* 移动端菜单 */}
            {isMobile && mobileMenuVisible && (
              <div className="fixed top-16 left-0 right-0 bg-[#181c2c] z-40 shadow-lg">
                <Menu
                  onClick={handleMenuClick}
                  selectedKeys={[currentMenuKey]}
                  mode="inline"
                  items={menuItems}
                  style={{ backgroundColor: STYLES.mobileMenuBg }}
                  className="border-b-0"
                />
              </div>
            )}

            {/* 内容区 */}
            <Layout className="pt-16">
              <Content className="mt-0 min-h-screen">
                <AntdRegistry>{children}</AntdRegistry>
              </Content>
            </Layout>

            {/* 页脚 */}
            <AppFooter />
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}