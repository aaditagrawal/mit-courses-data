import { getDegreeData } from "@/lib/degrees";
import { optionsResponse, apiError, apiSuccess } from "@/lib/api/response";

export const runtime = "edge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const degree = getDegreeData(decodedSlug);

  if (!degree) {
    return apiError(`Degree not found: ${decodedSlug}`, "not_found", 404);
  }

  return apiSuccess({ slug: decodedSlug, ...degree });
}

export async function OPTIONS() {
  return optionsResponse();
}
