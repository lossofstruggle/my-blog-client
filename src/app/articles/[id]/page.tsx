"use client";

import ArticlesDetail from "@/component/ArticlesDetail";
import { Article } from "@/lib/models/Article";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<Article>();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const response = await fetch(`/api/articles/${id}`);
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="flex flex-col bg-[#131929] pl-80 pr-48 pt-10">
      <div>
        <Link href="/articles">返回上一级</Link>
      </div>
      {data && <ArticlesDetail data={data} />}
    </div>
  );
}
