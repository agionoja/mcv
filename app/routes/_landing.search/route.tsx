import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Search | MCV" },
    { name: "description", content: "MCV account: Search" },
  ];
};

export default function Search() {
  return <>Search</>;
}
