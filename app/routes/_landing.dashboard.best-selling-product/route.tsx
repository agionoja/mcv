import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Best Selling Product | MCV" },
    { name: "description", content: "MVC best selling product" },
  ];
};

export default function BestSellingProduct() {
  return <></>;
}
