import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Supplier | MCV" },
    { name: "description", content: "Moscord Cosmetic Venture Supplier" },
  ];
};

export default function Supplier() {
  return <>Supplier</>;
}
