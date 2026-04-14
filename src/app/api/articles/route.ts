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
    const category = url.searchParams.get("category");

    let query = supabasePublic
      .from("hr_articles")
      .select("id, title, summary, category, cover_image, view_count, created_at, author_id", { count: "exact" })
      .eq("status", "APPROVED")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: { items: data, total: count, page, limit },
    });
  } catch (error) {
    console.error("[articles]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "获取文章列表失败" } },
      { status: 500 }
    );
  }
}
