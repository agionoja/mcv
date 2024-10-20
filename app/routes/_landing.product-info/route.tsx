import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Product Info | MCV" },
    { name: "description", content: "MCV account Product Info" },
  ];
};

export default function ProductInfo() {
  return <>dashboard</>;
}
