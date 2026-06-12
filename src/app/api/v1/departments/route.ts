import { optionsResponse, apiSuccess } from '@/lib/api/response';
import { getDepartmentSummaries } from '@/lib/api/search';

export const runtime = 'edge';

export async function GET() {
    const departments = getDepartmentSummaries();

    return apiSuccess(departments, { count: departments.length });
}

export async function OPTIONS() {
    return optionsResponse();
}
