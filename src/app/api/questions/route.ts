import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        console.log(request)
        const response = await prisma.question.findMany();
        return NextResponse.json(response);
    } catch { return NextResponse.json({ error: "笔记加载失败，请稍后重试" }, { status: 500 }); }
    finally {
        await prisma.$disconnect();
    }
}