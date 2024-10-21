import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory | MCV" },
    { name: "description", content: "MCV account: Inventory" },
  ];
};

export default function Inventory() {
  return (
    <>
      <Outlet />
    </>
  );
}
