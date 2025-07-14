import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return NextResponse.json({ error: "缺少id参数" }, { status: 400 });
        }

        const response = await prisma.article.findUnique({
            where: {
                id: id
            }
        });
        return NextResponse.json(response);
    } catch { 
        return NextResponse.json({ error: "文章加载失败，请稍后重试" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

