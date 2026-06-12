import { optionsResponse, apiSuccess } from '@/lib/api/response';

export const runtime = 'edge';

export async function GET() {
    return apiSuccess(
        {
            version: 'v1',
            description: 'Course Explorer REST API',
            endpoints: {
                search: {
                    path: '/api/v1/search',
                    method: 'GET',
                    params: ['q', 'type', 'department', 'branch', 'tag', 'limit', 'offset'],
                },
                courses: {
                    path: '/api/v1/courses',
                    method: 'GET',
                    params: ['q', 'department', 'branch', 'tag', 'limit', 'offset'],
                },
                course: {
                    path: '/api/v1/courses/{code}',
                    method: 'GET',
                    example: '/api/v1/courses/MAT%202122',
                },
                departments: {
                    path: '/api/v1/departments',
                    method: 'GET',
                },
                department: {
                    path: '/api/v1/departments/{slug}',
                    method: 'GET',
                    example: '/api/v1/departments/cps',
                },
                degrees: {
                    path: '/api/v1/degrees',
                    method: 'GET',
                    params: ['q', 'limit', 'offset'],
                },
                degree: {
                    path: '/api/v1/degrees/{slug}',
                    method: 'GET',
                    example: '/api/v1/degrees/btech-cse',
                },
            },
        },
        { count: 7 },
    );
}

export async function OPTIONS() {
    return optionsResponse();
}
