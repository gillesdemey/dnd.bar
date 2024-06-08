import { useCallback, useEffect, useRef } from "react";

const FUNCTION_BASE_URL = "http://localhost:54321/functions/v1/api";

export function useSessionSubscription(
  session: string,
  onUpdate: () => unknown,
) {
  const subscriptionURL = `${FUNCTION_BASE_URL}/sessions/${session}/sse`;
  const source = useRef<EventSource | null>();

  const handleError = useCallback((event: Event) => {
    console.log("error in SSE stream", event);
  }, []);

  useEffect(() => {
    let client = source.current;

    if (!client) {
      client = new EventSource(subscriptionURL);
      client.onerror = handleError;
      client.addEventListener("update", onUpdate);
      client.addEventListener("error", handleError);
    }

    // clean up
    return () => {
      client?.removeEventListener("update", onUpdate);
      client?.close();
    };
  }, [handleError, onUpdate, subscriptionURL]);
}
