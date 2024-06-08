import { Outlet, createFileRoute } from "@tanstack/react-router";
import { tavernForSession } from "../../taverns";

export const Route = createFileRoute("/sessions/_layout")({
  beforeLoad: ({ params }) => {
    const tavern = tavernForSession(params.sessionId);
    return tavern;
  },
  component: () => <Tavern />,
});

const Tavern = () => {
  const tavern = Route.useRouteContext();
  return (
    <div className="container">
      <hgroup>
        <h1>🍺 Welcome to “{tavern.name}”!</h1>
        <p>“{tavern.tagline}”</p>
      </hgroup>
      <Outlet />
    </div>
  );
};
