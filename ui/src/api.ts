import ky from "ky";
import { Tables } from "./database.types";

export type Orders = Tables<"orders">[];

export const httpClient = ky.create({
  prefixUrl: "http://localhost:54321/functions/v1/api/",
});
