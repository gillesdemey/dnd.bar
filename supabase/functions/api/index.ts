/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1" />

import { Hono } from "hono";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { streamSSE } from "hono/streaming";
import { cors } from "hono/cors";

import { checkSession } from "./middleware/session.ts";
import { supabase } from "./middleware/supabase.ts";

/* ⚠️ change this to your function name */
const app = new Hono().basePath("/api");

// set up cors for all routes, disable cache for all routes
app.use(cors());

app.get("/", async (c) => {
  return c.text("Hello!");
});

/* apply session check and supabase middleware */
app.get("/sessions/:session/orders", checkSession, supabase, async (c) => {
  const { sessionID, supabase } = c.var;

  const { data: orders = [], error } = await supabase
    .from("orders")
    .select("*")
    .eq("session", sessionID)
    .order("round");

  if (error) {
    throw new HTTPException(500, { message: JSON.stringify(error, null, 2) });
  }

  if (orders === null) {
    throw new HTTPException(500, { message: "no rows found" });
  }

  return c.json(orders);
});

app.get("/sessions/:session/sse", checkSession, supabase, (c) => {
  const { sessionID, supabase } = c.var;

  const channel = supabase.channel(sessionID);

  return streamSSE(c, async (stream) => {
    // unsubscribe when the steam is aborted
    stream.onAbort(() => {
      supabase.removeChannel(channel);
    });

    const handleChange = async () => {
      await stream.writeSSE({
        event: "update",
        data: "",
      });
    };

    const handleWelcome = async () => {
      await stream.writeSSE({
        event: "welcome, traveler!",
        data: "",
      });
    };

    const handleError = async (error: Error) => {
      await stream.writeSSE({
        event: "Uh-oh, a dragon!",
        data: error.message,
      });
    };

    // listen to all changes on the orders table and send an update event to the client to refetch
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          table: "orders",
          schema: "public",
          // broadcast only changes for this session
          filter: `session=eq.${sessionID}`,
        },
        handleChange,
      )
      .subscribe(async (status, error) => {
        if (status === "SUBSCRIBED") {
          await handleWelcome();
        }

        if (status === "CHANNEL_ERROR" && error) {
          await handleError(error);
        }
      });

    // keep sending a keep-alive
    while (true) {
      await stream.sleep(10000);
      await stream.writeSSE({ event: "ping", data: "" });
    }
  });
});

app.get("/", (c: Context) => c.text("Welcome, traveler! Have a beer 🍺"));

Deno.serve(app.fetch);
