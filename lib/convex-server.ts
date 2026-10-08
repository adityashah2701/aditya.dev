import { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import {
  getFunctionName,
  type FunctionReference,
  type FunctionReturnType,
} from "convex/server";
import { convexToJson } from "convex/values";

/** Seconds a server-rendered Convex result may be reused before refetching. */
export const CONVEX_REVALIDATE_SECONDS = 3600;

type PublicQuery = FunctionReference<"query", "public">;

// convex/nextjs forces `cache: "no-store"` on every request, which makes each
// page fully dynamic (a server render + Convex round trip per visit, nothing
// cached at the edge). Using the HTTP client with Next's fetch cache lets those
// pages be statically generated and revalidated (ISR) instead. Clients still
// get live data: usePreloadedQuery subscribes over WebSocket after hydration.
function createCachedClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("Environment variable NEXT_PUBLIC_CONVEX_URL is not set.");
  }

  const cachedFetch: typeof fetch = (input, init) =>
    fetch(input, {
      ...init,
      next: { revalidate: CONVEX_REVALIDATE_SECONDS, tags: ["convex"] },
    });

  return new ConvexHttpClient(url, { fetch: cachedFetch });
}

export async function fetchQueryCached<Query extends PublicQuery>(
  query: Query,
  args: Query["_args"] = {},
): Promise<FunctionReturnType<Query>> {
  return createCachedClient().query(query, args);
}

/** Cached equivalent of `preloadQuery` from `convex/nextjs`. */
export async function preloadQueryCached<Query extends PublicQuery>(
  query: Query,
  args: Query["_args"] = {},
): Promise<Preloaded<Query>> {
  const value = await fetchQueryCached(query, args);

  return {
    _name: getFunctionName(query),
    _argsJSON: convexToJson(args),
    _valueJSON: convexToJson(value),
  } as unknown as Preloaded<Query>;
}
