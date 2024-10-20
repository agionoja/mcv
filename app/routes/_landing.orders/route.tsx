import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Orders | MCV" },
    { name: "description", content: "MCV account: Orders" },
  ];
};

export default function Orders() {
  return <>Orders</>;
}
