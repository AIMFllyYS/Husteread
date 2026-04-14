import { NextRequest, NextResponse } from "next/server";
import { verifyCodeSchema } from "@/lib/validations";
import { verifyCode, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifyCodeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0].message } },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;

    const valid = await verifyCode(email, code);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_CODE", message: "验证码无效或已过期" } },
        { status: 401 }
      );
    }

    // Create session + user (if first login)
    const userId = await createSession(email);

    return NextResponse.json({ success: true, data: { userId } });
  } catch (error) {
    console.error("[verify-code]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "验证失败，请稍后重试" } },
      { status: 500 }
    );
  }
}
