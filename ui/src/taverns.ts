import fnv1a from "fnv1a";
import taverns from "./assets/taverns.json";

// deterministic function to always get the same tavern for the sessionID
// the result may be different taverns are shuffled, but appending should not have any impact
export const tavernForSession = (sessionID: string) => {
  const hash = fnv1a(sessionID);
  const randomIndex = hash % taverns.length;

  return taverns[randomIndex];
};
