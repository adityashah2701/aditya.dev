import { AUTHOR_NAME } from "@/constants/seo";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  createOgImageResponse,
} from "@/lib/og-image";

export const runtime = "edge";

export const alt = `${AUTHOR_NAME} Open Graph Image`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return createOgImageResponse();
}
