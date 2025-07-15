import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);
    } catch (error) {
        console.error("获取文章列表失败:", error);
        return NextResponse.json({ error: "获取文章列表失败" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}