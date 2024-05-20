import { Outlet, useParams } from "react-router-dom";
import invariant from "tiny-invariant";
import { tavernForSession } from "./taverns";

const Layout = () => {
  const { sessionID } = useParams();
  invariant(sessionID);

  const tavern = tavernForSession(sessionID);

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

export default Layout;
