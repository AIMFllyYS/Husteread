import { NextRequest, NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase";
import { paginationSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { page, limit } = paginationSchema.parse({
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    });

    const from = (page - 1) * limit;
    const { data, count, error } = await supabasePublic
      .from("hr_forum_posts")
      .select("id, title, content, likes, status, author_id, created_at", { count: "exact" })
      .eq("status", "APPROVED")
      .order("created_at", { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: { items: data, total: count, page, limit },
    });
  } catch (error) {
    console.error("[forum]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "获取论坛帖子失败" } },
      { status: 500 },
    );
  }
}
