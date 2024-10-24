import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Best Selling Category | MCV" },
    { name: "description", content: "MVC best selling category" },
  ];
};

export default function BestSellingCategory() {
  return <></>;
}
