import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Suppliers | MCV" },
    { name: "description", content: "MCV account: Add Suppliers" },
  ];
};

export default function AddSuppliers() {
  return <>Add Suppliers</>;
}
