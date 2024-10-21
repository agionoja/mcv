import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Suppliers | MCV" },
    { name: "description", content: "MCV account suppliers" },
  ];
};

export default function Suppliers() {
  return (
    <>
      <Outlet />
    </>
  );
}
