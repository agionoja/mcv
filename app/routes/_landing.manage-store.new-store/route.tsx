import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Store | MCV" },
    { name: "description", content: "MCV account: Add Store" },
  ];
};

export default function AddStore() {
  return <>Add store</>;
}
