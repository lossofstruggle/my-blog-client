import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags)
    } catch {
        return NextResponse.json({ message: "标签获取失败" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
