const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function corsHeaders(): HeadersInit {
  return CORS_HEADERS;
}

export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: HeadersInit = {},
): Response {
  return Response.json(body, {
    status,
    headers: {
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export function apiSuccess<T>(data: T, meta: Record<string, unknown> = {}): Response {
  return jsonResponse({ data, meta });
}

export function apiError(
  message: string,
  code: string,
  status = 400,
  details?: Record<string, unknown>,
): Response {
  return jsonResponse({ error: { message, code, ...details } }, status);
}

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
