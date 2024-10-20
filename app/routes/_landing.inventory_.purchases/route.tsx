import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Purchases | MCV" },
    { name: "description", content: "MCV account: Inventory Purchases" },
  ];
};

export default function InventoryPurchases() {
  return <></>;
}
