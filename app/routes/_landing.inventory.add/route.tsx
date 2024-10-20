import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Inventory | MCV" },
    { name: "description", content: "MCV account add Inventory" },
  ];
};

export default function ADDInventory() {
  return <>Add Inventory</>;
}
