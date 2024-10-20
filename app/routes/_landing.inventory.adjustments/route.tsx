import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Adjustments | MCV" },
    { name: "description", content: "MCV account: Inventory Adjustments" },
  ];
};

export default function InventoryAdjustments() {
  return <></>;
}
