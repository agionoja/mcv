import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory History | MCV" },
    { name: "description", content: "MCV account: Inventory History" },
  ];
};

export default function InventoryHistory() {
  return <></>;
}
