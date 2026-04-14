import { NextRequest, NextResponse } from "next/server";
import { sendCodeSchema } from "@/lib/validations";
import { createVerificationCode } from "@/lib/auth";
import { sendVerificationCode } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = sendCodeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0].message } },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Generate and store code
    const code = await createVerificationCode(email);

    // Send email
    await sendVerificationCode({ to: email, code });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-code]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "发送验证码失败，请稍后重试" } },
      { status: 500 }
    );
  }
}
