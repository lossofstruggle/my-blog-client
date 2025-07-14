import { Article } from "@/lib/models/Article";
import { formatDateWithIntl } from "@/lib/utils/date";
import { Divider } from "antd";
import "github-markdown-css/github-markdown.css";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function ArticlesDetail({ data }: { data: Article }) {
  return (
    <div className="bg-[#131929]   px-4 md:px-12 lg:pr-48 pt-10 pb-20 ">
      <h1 className="text-xl text-gray-500 ">
        {formatDateWithIntl(new Date(data.created_time), {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>
      <h1 className="text-4xl font-bold pt-8 text-white">{data?.title}</h1>
      <Divider size="large" style={{ borderColor: "gray" }} />
      <div
        className="markdown-body bg-transparent text-gray-200"
        style={{
          padding: "20px",
          backgroundColor: "#131929",
          color: "white",
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            marked.parse(data?.content ?? "") as string
          ),
        }}
      />
    </div>
  );
}
