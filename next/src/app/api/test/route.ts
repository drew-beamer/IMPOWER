import { db } from "@/lib/db";
import { teams } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const myData = await db
    .select()
    .from(teams)
    .then((rows) => {
      return rows;
    });
  return NextResponse.json(myData);
}
