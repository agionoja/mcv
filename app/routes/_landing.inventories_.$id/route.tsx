import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory | MCV" },
    { name: "description", content: "Moscord Cosmetic Venture Inventory" },
  ];
};

export default function Inventory() {
  return <>Inventory</>;
}
