import { createMiddleware } from "hono/factory";
import { assertExists } from "@std/assert";

import { createClient } from "supabase";
import { Database } from "../database.types.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
assertExists(SUPABASE_URL, "missing env var SUPABASE_URL");

const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
assertExists(SUPABASE_SERVICE_ROLE_KEY, "missing env var SUPABASE_SERVICE_ROLE_KEY");

// let's use empty key for local development
const client = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// add the supabase client to the env
type Env = {
  Variables: {
    supabase: typeof client;
  };
};

export const supabase = createMiddleware<Env>(async (c, next) => {
  c.set("supabase", client);
  await next();
});
