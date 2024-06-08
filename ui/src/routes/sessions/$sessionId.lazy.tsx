import { createFileRoute } from "@tanstack/react-router";
import { validate } from "uuid";

import SessionView from "../../components/sessions/SessionView";
import { Orders } from "../../api";

export const Route = createFileRoute("/sessions/$sessionId")({
  validateSearch: () => {},
  pendingComponent: () => <div>Loading...</div>,
  loader: async ({ params, abortController, context }) => {
    validateUUID(params.sessionId);

    return context.httpClient
      .get(`sessions/${params.sessionId}/orders`, {
        signal: abortController.signal,
      })
      .json<Orders>();
  },
  component: () => <SessionView />,
});

function validateUUID(sessionId: string) {
  const isValidIdentifier = validate(sessionId);

  if (!isValidIdentifier) {
    throw new Error("sessionID is not a valid UUID");
  }
}
