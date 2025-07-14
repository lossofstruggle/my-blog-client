import { Article } from "@/lib/models/Article";
import { formatDateWithIntl } from "@/lib/utils/date";
import { Card, List } from "antd";
import Link from "next/link";

export default function ArticleCard({ item }: { item: Article }) {
  return (
    <List.Item key={item.id} className="mb-4">
      <Card
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        className="w-full h-70 hover:shadow-lg transition-shadow duration-300"
      >
        {" "}
        <span className="text-sm text-gray-500">{formatDateWithIntl(new Date(item.created_time), { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <Link href={`/articles/${item.id}`}>
          <div className="cursor-pointer">
            <h4 className="text-lg font-medium  mb-2 hover:text-blue-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-gray-600 line-clamp-4 mb-3">
              {item.excerpt || item.content.substring(0, 120) + "..."}
            </p>
          </div>
        </Link>{" "}
        <a className="" href={`/articles/${item.id}`}>
          阅读全文
        </a>
      </Card>
    </List.Item>
  );
}
