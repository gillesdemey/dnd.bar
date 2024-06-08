import { Table } from "./Table";
import { mapDatabaseRowToTableRow } from "../../orders";
import { useSessionSubscription } from "../../useSubscription";
import { QRCode } from "react-qrcode-logo";
import { useState } from "react";
import { IconShare2 } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { Route } from "../../routes/sessions/$sessionId.lazy";

function SessionView() {
  const router = useRouter();
  const { sessionId } = Route.useParams();
  const orders = Route.useLoaderData();

  // refetch everything in the session when we receive an update signal
  useSessionSubscription(sessionId, router.invalidate);

  const rows = mapDatabaseRowToTableRow(orders ?? []);
  return (
    <>
      <Table rows={rows} />
      <Share />
    </>
  );
}

function Share() {
  const [open, setOpen] = useState(false);
  const shareURL = window.location.href;

  return (
    <>
      <dialog id="share" open={open}>
        <article>
          <header>
            <button
              formMethod="dialog"
              aria-label="Close"
              rel="prev"
              onClick={() => setOpen(false)}
            />
            <p>
              <strong>🍺 You meet in a tavern...</strong>
            </p>
          </header>
          <p>
            We're excited to host more adventurers! To invite more party
            members, share this QR code with your fellow bar patrons.
          </p>
          <QRCode value={shareURL} size={256} quietZone={10} qrStyle="dots" />
        </article>
      </dialog>
      <button onClick={() => setOpen(true)}>
        Share <IconShare2 />
      </button>
    </>
  );
}

export default SessionView;
