import { optionsResponse, apiError, apiSuccess } from '@/lib/api/response';
import { getDepartmentBySlug } from '@/lib/api/search';

export const runtime = 'edge';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const { slug } = await params;
    const department = getDepartmentBySlug(decodeURIComponent(slug));

    if (!department) {
        return apiError(`Department not found: ${slug}`, 'not_found', 404);
    }

    return apiSuccess(department, { count: department.courses.length });
}

export async function OPTIONS() {
    return optionsResponse();
}
