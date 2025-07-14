"use client";

import { Card, List, Skeleton, Empty, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { Article } from "@/lib/models/Article";
import ArticleCard from "@/component/ArticleCard";

const PAGE_SIZE = 20;

// 防抖函数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timer: NodeJS.Timeout | null = null;
//   return (...args: Parameters<T>) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

export default function ArticlePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchArticles = useCallback(
    async (reset = false) => {
      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setLoading(true);
        setError(null);

        const currentPage = reset ? 1 : page;
        // const url = `/api/articles?page=${currentPage}&limit=${PAGE_SIZE}&search=${encodeURIComponent(
        //   searchQuery
        // )}`;

        const url = `/api/articles?page=${currentPage}&limit=${PAGE_SIZE})}`;
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("文章加载失败，请稍后重试");

        const newData: Article[] = await response.json();

        setHasMore(newData.length === PAGE_SIZE);

        if (reset) {
          setData(newData);
          setPage(2);
        } else {
          setData((prev) => [...prev, ...newData]);
          setPage((prev) => prev + 1);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // 忽略取消请求的错误
        if (err.name === "AbortError") return;
        setError(err.message || "未知错误");
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    // [page, searchQuery]
    [page]
  );

  // 初始加载和搜索变化时重新加载
  useEffect(() => {
    fetchArticles(true);
  }, [fetchArticles]);
  // [searchQuery, fetchArticles]);

  // 设置无限滚动观察器
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchArticles();
        }
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, fetchArticles]);

  // 组件卸载时取消所有请求
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // const handleSearch = debounce((value: string) => {
  //   setSearchQuery(value);
  // }, 500);

  const renderSkeletons = () => (
    <div className="w-full md:w-2/3 space-y-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4 md:p-6">
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
      ))}
    </div>
  );

  const renderError = () => (
    <div className="text-center py-12 w-full md:w-2/3">
      <div className="mb-4 text-red-500 text-4xl">⚠️</div>
      <h3 className="text-lg font-medium mb-2">加载失败</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <Button type="primary" onClick={() => fetchArticles(true)}>
        重新加载
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <Empty
      image={<SearchOutlined className="text-4xl text-gray-400" />}
      description={
        <div>
          <h3 className="text-lg font-medium mb-1">未找到相关文章</h3>
          <p className="text-gray-500">尝试使用不同的关键词或浏览其他文章</p>
        </div>
      }
      className="py-12 w-full md:w-2/3"
    />
  );

  const renderArticleList = () => (
    <div className="w-full" ref={containerRef}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        className="w-full"
        renderItem={(item: Article) => <ArticleCard item={item} />}
      >
        <div ref={sentinelRef} className="h-1" />

        {loading && (
          <div className="flex justify-center my-4">
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        )}

        {!hasMore && data.length > 0 && (
          <div className="text-center py-6 text-gray-500">已加载所有文章</div>
        )}
      </List>
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-8 pl-32 pr-32 mx-auto px-4 bg-[#131929]">
      <div className="text-center mb-8">
        {" "}
        <span className="text-4xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Thank you for watching.
        </span>
      </div>
      <div>
        {loading && data.length === 0
          ? renderSkeletons()
          : error
          ? renderError()
          : data.length === 0
          ? renderEmpty()
          : renderArticleList()}
      </div>
    </div>
  );
}
