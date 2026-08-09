export function getApiDocsMarkdown(baseUrl: string): string {
  const origin = baseUrl.replace(/\/$/, "");

  return `# Course Web API (v1)

Queryable REST API for MIT Manipal course catalogs and degree plans.

**Base URL:** \`${origin}\`

## Response format

Successful responses:

\`\`\`json
{
  "data": { ... },
  "meta": { "total": 42, "count": 20, "query": "machine learning" }
}
\`\`\`

Errors:

\`\`\`json
{
  "error": { "message": "Course not found: XYZ 0000", "code": "not_found" }
}
\`\`\`

## Common query parameters

| Param | Description |
|-------|-------------|
| \`q\` | Text search (code, title, department, syllabus, tags, references) |
| \`type\` | On \`/search\` only: \`all\` (default), \`courses\`, or \`degrees\` |
| \`department\` | Filter by department name or slug |
| \`branch\` | Filter by branch slug (e.g. \`cps\`, \`ece\`) |
| \`tag\` | Filter by tag (e.g. \`core\`, \`elective\`) |
| \`limit\` | Max results per page (default 50, max 100) |
| \`offset\` | Pagination offset |

## Endpoints

### Discovery
\`GET /api/v1\` — lists available endpoints

### Unified search
\`GET /api/v1/search?q={query}\`

Search courses and degree programs in one request.

Example: \`${origin}/api/v1/search?q=machine+learning&type=all&limit=10\`

### Courses
\`GET /api/v1/courses?q={query}\` — list or search courses

\`GET /api/v1/courses/{code}\` — get a single course by code

Example: \`${origin}/api/v1/courses/MAT%202122\`

### Departments
\`GET /api/v1/departments\` — list departments

\`GET /api/v1/departments/{slug}\` — full catalog for a department

Example: \`${origin}/api/v1/departments/cps\`

### Degrees
\`GET /api/v1/degrees?q={query}\` — list or search degree programs

\`GET /api/v1/degrees/{slug}\` — full degree plan with semesters and elective pools

Example: \`${origin}/api/v1/degrees/btech-cse\`

## Example usage

\`\`\`bash
# Search across courses and degrees
curl "${origin}/api/v1/search?q=machine+learning&limit=5"

# Filter courses by branch
curl "${origin}/api/v1/courses?q=CSS&branch=cps&limit=20"

# Get a specific course
curl "${origin}/api/v1/courses/MAT%202122"

# Get a degree plan
curl "${origin}/api/v1/degrees/btech-cse"
\`\`\`

## Notes for agents

- Course codes contain spaces (e.g. \`MAT 2122\`) — URL-encode them in path segments.
- Use \`/api/v1/search\` for broad queries; use resource-specific endpoints when you know the entity type.
- Paginate with \`limit\` and \`offset\` when results may be large.
- All endpoints support CORS and return JSON.
`;
}
