import { useRerender, useTimeoutEffect } from "@react-hookz/web";
import { FC, useEffect, useState } from "react";

/**
 * Loading component that only shows up after <timeout>
 */
export const Loading: FC<{ timeout?: number }> = ({ timeout = 300 }) => {
  const [timeoutDone, setTimeoutDone] = useState(false);
  const rerender = useRerender();

  const [cancel] = useTimeoutEffect(() => {
    setTimeoutDone(true);
    rerender();
  }, timeout);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return timeoutDone ? <span aria-busy="true">Loading...</span> : null;
};
