import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Reports | MCV" },
    { name: "description", content: "MCV account reports" },
  ];
};

export default function Reports() {
  return <>dashboard</>;
}
