import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sessions/new")({
  component: () => <div>Hello /sessions/new!</div>,
});
