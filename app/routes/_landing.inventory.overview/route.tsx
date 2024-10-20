import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Overview | MCV" },
    { name: "description", content: "MCV account: Inventory Overview" },
  ];
};

export default function InventoryOverview() {
  return <></>;
}
