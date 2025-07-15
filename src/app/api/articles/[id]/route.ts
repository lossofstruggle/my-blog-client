import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 使用更明确的类型定义
type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json({ error: "缺少id参数" }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: {
        id: id
      }
    });

    if (!article) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("获取文章失败:", error);
    return NextResponse.json({ error: "文章加载失败，请稍后重试" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}