import ky from "ky";
import { Tables } from "./database.types";

type Orders = Tables<"orders">[];

const httpClient = ky.create({
  prefixUrl: "http://localhost:54321/functions/v1/api/",
});

export function fetchOrdersForSession(session: string) {
  return httpClient
    .get(`sessions/${session}/orders`)
    .json<Orders>();
}
