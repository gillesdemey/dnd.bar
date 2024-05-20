import { createBrowserRouter, redirect } from "react-router-dom";
import SessionView from "./SessionView";
import Home from "./Home";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sessions/new",
  },
  {
    path: "/sessions/*",
    element: <Layout />,
    children: [
      {
        path: ":sessionID",
        element: <SessionView />,
      },
    ],
  },
  // redirect unknown sessions to create a new SessionID
  {
    path: "*",
    loader: () => redirect("/sessions/new"),
  },
]);

export default router;
