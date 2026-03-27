import {
  OG_IMAGE_CONTENT_TYPE,
  createOgImageResponse,
} from "@/lib/og-image";

export const runtime = "edge";

export function GET() {
  const response = createOgImageResponse();
  response.headers.set("Content-Type", OG_IMAGE_CONTENT_TYPE);
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400"
  );

  return response;
}
