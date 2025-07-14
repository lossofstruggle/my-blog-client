"use client";

import { Question } from "@/lib/models/Question";
import { Tag } from "@/lib/models/Tag";
import { ConfigProvider, Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

type MenuItem = Required<MenuProps>["items"][number];
type GroupedQuestions = Record<string, Question[]>;

// 预定义的菜单配置

// 自定义深色主题配置
const darkTheme = {
  components: {
    Menu: {
      // 统一所有菜单项的背景色
      darkItemBg: "#131929",
      darkItemSelectedBg: "#1e2a4d",
      darkItemHoverBg: "#1e2a4d",
      darkSubMenuItemBg: "#131929",
      darkPopupBg: "#131929",
      itemColor: "rgba(255, 255, 255, 0.85)",
      itemSelectedColor: "#fff",
      itemHoverColor: "#fff",
      itemMarginBlock: 0,
      itemMarginInline: 0,
      itemBorderRadius: 0,
    },
  },
};

export default function Page({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>();

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags");
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      const data: Tag[] = await response.json();
      setTags(data);
    } catch {
      setError("标签获取失败");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questions");

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      const data: Question[] = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      console.error("数据获取失败:", err);
    } finally {
      setLoading(false);
    }
  };

  // 获取问题数据
  useEffect(() => {
    fetchData();
    fetchTags();
  }, []);

  // 分组问题数据
  const groupedQuestions = useMemo<GroupedQuestions>(() => {
    return questions.reduce((acc, question) => {
      const tag = question.tags;
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(question);
      return acc;
    }, {} as GroupedQuestions);
  }, [questions]);

  // 生成菜单项
  const menuItems = useMemo<MenuItem[]>(() => {
    return (tags ?? []).map((item) => {
      const groupQuestions = groupedQuestions[item.name] || [];
      return {
        key: item.id,
        label: item.name,
        children: groupQuestions.map((question) => ({
          key: question.id,
          label: (
            <Link
              href={`/questions/${question.id}`}
              className="block w-full h-full py-2 px-4 hover:text-white"
            >
              {question.title}
            </Link>
          ),
          className: "hover:bg-[#1e2a4d]",
        })),
      };
    });
  }, [groupedQuestions, tags]);

  // 错误状态处理
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        加载失败: {error}
      </div>
    );
  }

  // 加载状态处理
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#131929] h-screen">
      <ConfigProvider theme={darkTheme}>
        <Layout className="flex flex-1">
          <Sider
            width={400}
            style={{ background: "#131929" }}
            className="pt-12 pl-4 md:pl-16"
            breakpoint="lg"
            collapsedWidth="0"
            theme="dark"
          >
            <Menu
              theme="dark"
              className="text-white"
              defaultSelectedKeys={["java"]}
              defaultOpenKeys={["java"]}
              mode="inline"
              items={menuItems}
              style={{ background: "#131929" }}
              // 确保子菜单弹出层使用相同背景色
            />
          </Sider>
          <Content className="mt-0 min-h-screen overflow-auto">
            {children}
          </Content>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
