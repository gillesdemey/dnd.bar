import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <hgroup>
      <h1>🍺 Welcome, traveler!</h1>
      <p>Stay a while and listen.</p>
    </hgroup>
  ),
});
