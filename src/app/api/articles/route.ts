import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
    const response = await prisma.article.findMany();
    return NextResponse.json(response);
}