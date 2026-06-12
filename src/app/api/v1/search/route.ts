import { NextRequest } from 'next/server';
import { optionsResponse, apiSuccess } from '@/lib/api/response';
import { parseLimit, parseOffset, parseSearchType } from '@/lib/api/params';
import { generalSearch } from '@/lib/api/search';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const result = generalSearch({
        q: searchParams.get('q') ?? undefined,
        type: parseSearchType(searchParams.get('type')),
        department: searchParams.get('department') ?? undefined,
        branch: searchParams.get('branch') ?? undefined,
        tag: searchParams.get('tag') ?? undefined,
        limit: parseLimit(searchParams.get('limit')),
        offset: parseOffset(searchParams.get('offset')),
    });

    return apiSuccess(result, {
        count: result.courses.data.length + result.degrees.data.length,
        coursesTotal: result.courses.total,
        degreesTotal: result.degrees.total,
    });
}

export async function OPTIONS() {
    return optionsResponse();
}
