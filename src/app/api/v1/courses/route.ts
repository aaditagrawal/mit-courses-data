import { NextRequest } from "next/server";
import { optionsResponse, apiSuccess } from "@/lib/api/response";
import { parseLimit, parseOffset } from "@/lib/api/params";
import { searchCourses as searchCoursesApi } from "@/lib/api/search";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = searchCoursesApi({
    q: searchParams.get("q") ?? undefined,
    department: searchParams.get("department") ?? undefined,
    branch: searchParams.get("branch") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
    limit: parseLimit(searchParams.get("limit")),
    offset: parseOffset(searchParams.get("offset")),
  });

  return apiSuccess(result.data, {
    total: result.total,
    query: result.query,
    count: result.data.length,
    limit: parseLimit(searchParams.get("limit")),
    offset: parseOffset(searchParams.get("offset")),
  });
}

export async function OPTIONS() {
  return optionsResponse();
}
