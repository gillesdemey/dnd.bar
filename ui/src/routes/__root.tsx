import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { httpClient } from "../api";

type Context = {
  httpClient: typeof httpClient;
};

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <>
      <div className="container">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});
