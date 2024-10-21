import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Orders | MCV" },
    { name: "description", content: "MCV account: Orders" },
  ];
};

export default function Orders() {
  return (
    <>
      <Outlet />
    </>
  );
}
