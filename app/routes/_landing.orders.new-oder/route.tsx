import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "ADD Order | MCV" },
    { name: "description", content: "MCV account: ADD Order" },
  ];
};

export default function ADDOrdes() {
  return <>Orders</>;
}
