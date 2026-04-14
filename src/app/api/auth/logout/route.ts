import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[logout]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "登出失败" } },
      { status: 500 }
    );
  }
}
