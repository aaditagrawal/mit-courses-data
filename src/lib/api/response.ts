const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function corsHeaders(): HeadersInit {
  return CORS_HEADERS;
}

export function jsonResponse<T>(body: T, status = 200, extraHeaders: HeadersInit = {}): Response {
  return Response.json(body, {
    status,
    headers: {
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

/** Counters and echoed query parameters returned alongside a successful payload. */
export interface ApiMeta {
  count?: number;
  total?: number;
  query?: string | null;
  limit?: number;
  offset?: number;
  coursesTotal?: number;
  degreesTotal?: number;
}

export function apiSuccess<T>(data: T, meta: ApiMeta = {}): Response {
  return jsonResponse({ data, meta });
}

/** Extra JSON-scalar fields merged into the error envelope by a specific route. */
export type ApiErrorDetails = Record<string, string | number | boolean | null>;

export function apiError(
  message: string,
  code: string,
  status = 400,
  details?: ApiErrorDetails,
): Response {
  return jsonResponse({ error: { message, code, ...details } }, status);
}

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
