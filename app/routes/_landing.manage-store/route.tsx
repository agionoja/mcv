import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Store | MCV" },
    { name: "description", content: "MCV account: Manage Store" },
  ];
};

export default function ManageStore() {
  return <>Manage Store</>;
}
