import { HTTPException } from "hono/http-exception";
import { createMiddleware } from "hono/factory";

export const MISSING_SESSION_ID = new HTTPException(400, {
  message: "missing session ID",
});

type Env = {
  Variables: {
    sessionID: string;
  };
};

export const checkSession = createMiddleware<Env>(async (c, next) => {
  const session = c.req.param("session");
  if (!session) {
    throw MISSING_SESSION_ID;
  }

  c.set("sessionID", session);
  await next();
});
