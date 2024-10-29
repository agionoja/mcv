import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Order | MCV" },
    { name: "description", content: "MCV account: Order" },
  ];
};

export default function Order() {
  return <>Order</>;
}
