import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Store | MCV" },
    { name: "description", content: "MCV account: Edit Store" },
  ];
};

export default function EditStore() {
  return <>EditStore</>;
}
