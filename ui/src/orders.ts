import {
  groupBy,
  mapValues,
  maxBy,
  reduce,
} from "lodash";

import { Tables } from "../database.types.ts";

export interface Item {
  name: string;
  price: number;
}

export interface TableRow {
  name: string;
  rounds: Array<Item[]>;
}

// @TODO ugh typescript
export function mapDatabaseRowToTableRow(
  orders: Tables<"orders">[],
): TableRow[] {
  // find out how many rounds to put in our list
  const maxRounds = maxBy(orders, "round");
  const roundsSize = maxRounds ? Math.max(6, maxRounds.round) : 6;

  // group all orders by name
  const byName = groupBy(orders, "name");

  // for each name convert rows to orders
  const rounds = mapValues(byName, (roundsByName) => {
    // group by rounds so we have an array of items purchased in each round
    const byRounds = groupBy(roundsByName, "round");
    const itemsByRound = Object.entries(byRounds);

    // construct empty array of rounds so we can start filling them with the items by round
    const recordsByRound: Tables<"orders">[][] = Array.from({
      length: roundsSize,
    })
    .fill([]);

    itemsByRound.forEach(([round, roundWithRecords]) => {
      const index = Number(round);
      recordsByRound[index] = roundWithRecords;
    });

    const rows = recordsByRound.map((records) => {
      const items = records.map((record) => {
        return {
          name: record.item,
          price: record.price,
        } as Item;
      });

      return items;
    });

    return rows;
  });

  const toTableRow = reduce(rounds, (acc: TableRow[] = [], rounds, name) => {
    acc.push({
      name,
      rounds,
    });

    return acc;
  }, []);

  return toTableRow;
}
