import { getCourseByCode } from '@/lib/courses';
import { optionsResponse, apiError, apiSuccess } from '@/lib/api/response';

export const runtime = 'edge';

interface Props {
    params: Promise<{ code: string }>;
}

export async function GET(_request: Request, { params }: Props) {
    const { code } = await params;
    const decodedCode = decodeURIComponent(code).trim();
    const course = getCourseByCode(decodedCode);

    if (!course) {
        return apiError(`Course not found: ${decodedCode}`, 'not_found', 404);
    }

    return apiSuccess(course);
}

export async function OPTIONS() {
    return optionsResponse();
}
