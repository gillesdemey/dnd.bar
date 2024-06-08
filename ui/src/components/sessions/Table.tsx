import { sumBy } from "lodash";

import { Item, TableRow } from "../../orders";
import { FC } from "react";

// @TODO dynamic number of rounds
interface Props {
  rows: TableRow[];
}

export const Table = ({ rows = [] }: Props) => {
  return (
    <table className="striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Round 0</th>
          <th scope="col">Round 1</th>
          <th scope="col">Round 2</th>
          <th scope="col">Round 3</th>
          <th scope="col">Round 4</th>
          <th scope="col">Round 5</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row key={row.name} name={row.name} rounds={row.rounds} />
        ))}
      </tbody>
    </table>
  );
};

const Row: FC<{ name: string; rounds: Item[][] }> = ({ name, rounds }) => {
  return (
    <tr>
      <th scope="row">{name}</th>
      {rounds.map((items, index) => (
        <td key={index}>{serializeItems(items)}</td>
      ))}
      <td>{formatCurrency(calculateTotal(rounds))}</td>
    </tr>
  );
};

// @TODO maybe show "Coca Cola x 2" if two or more of the same items were ordered by the same name in the same round
function serializeItems(items: Item[]) {
  if (items.length === 0) {
    return <span>/</span>;
  }

  return items.map((item) => item.name).join(", ");
}

function calculateTotal(rounds: Item[][]): number {
  return sumBy(rounds, (items: Item[]) => sumBy(items, "price"));
}

function formatCurrency(amount: number): string {
  const formatter = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(amount);
}
