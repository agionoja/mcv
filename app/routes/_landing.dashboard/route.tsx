import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | MCV" },
    { name: "description", content: "MCV account dashboard" },
  ];
};

export default function Dashboard() {
  return <></>;
}
