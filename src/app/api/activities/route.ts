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
    const status = url.searchParams.get("status");

    let query = supabasePublic
      .from("hr_activities")
      .select("*", { count: "exact" })
      .order("start_time", { ascending: false });

    if (status) {
      query = query.eq("status", status);
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
    console.error("[activities]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "获取活动列表失败" } },
      { status: 500 }
    );
  }
}
