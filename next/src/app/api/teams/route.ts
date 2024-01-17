import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(params: NextRequest) {
    const json = await prisma.team.findMany({where: {subregion: "California"}});
    return NextResponse.json(json)
}