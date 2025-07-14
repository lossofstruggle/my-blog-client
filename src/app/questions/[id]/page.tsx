"use client";

import { Question } from "@/lib/models/Question";
import { Divider, Skeleton } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

// 提取API请求逻辑到独立函数，便于测试和复用
async function fetchQuestion(id: string): Promise<Question> {
  const response = await fetch(`/api/questions/${id}`, {
    signal: new AbortController().signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP错误 ${response.status}`);
  }

  return response.json();
}

export default function Page() {
  const { id } = useParams();
  // 使用更清晰的状态结构
  const [state, setState] = useState<{
    data: Question | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // 验证ID有效性
    if (!id || Array.isArray(id)) {
      setState({
        data: null,
        loading: false,
        error: "无效的问题ID",
      });
      return;
    }

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const result = await fetchQuestion(id);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as Error).name !== "AbortError"
        ) {
          const errorMessage =
            err instanceof Error ? err.message : "获取数据失败";
          setState({ data: null, loading: false, error: errorMessage });
          console.error("数据获取失败:", err);
        }
      }
    };

    fetchData();
    // 组件卸载时自动取消请求
    return () => new AbortController().abort();
  }, [id]);

  // 提取加载状态组件
  const renderLoading = () => (
    <div className="bg-[#131929] p-6 md:p-12 lg:p-24 min-h-screen">
      <Skeleton active paragraph={{ rows: 4 }} />
      <Divider className="my-4 bg-gray-500" />
      <Skeleton active paragraph={{ rows: 8 }} />
    </div>
  );

  // 提取错误状态组件
  const renderError = () => (
    <div className="bg-[#131929] p-6 md:p-12 lg:p-24 min-h-screen text-white">
      <div className="text-red-500 text-center py-8">
        <h2 className="text-xl font-semibold">加载失败</h2>
        <p className="mt-2">{state.error}</p>
        <p className="mt-4">请尝试刷新页面或稍后再试</p>
      </div>
    </div>
  );

  // 提取空状态组件
  const renderEmpty = () => (
    <div className="bg-[#131929] p-6 md:p-12 lg:p-24 min-h-screen text-white">
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">问题未找到</h2>
        <p className="mt-4">请求的问题不存在或已被删除</p>
      </div>
    </div>
  );

  // 提取内容渲染组件
  const renderContent = () => (
    <div className="bg-[#131929] p-6 md:p-12 lg:pr-24 min-h-screen">
      <div className="text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {state.data?.title}
        </h1>
        <Divider className="my-4 bg-gray-500" />
        <div
          className="mt-4 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              marked.parse(state.data?.content ?? "") as string
            ),
          }}
        ></div>
      </div>
    </div>
  );

  // 使用清晰的状态流转逻辑
  if (state.loading) return renderLoading();
  if (state.error) return renderError();
  if (!state.data) return renderEmpty();

  return renderContent();
}
