import { cache } from "hono/cache";

export function noCache () {
  return cache({ cacheName: "dnd.bar", cacheControl: "no-store, no-cache, must-revalidate, proxy-revalidate" });
}
