import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Store | MCV" },
    { name: "description", content: "MCV account: Manage Store" },
  ];
};

export default function ManageStore() {
  return (
    <>
      <Outlet />
    </>
  );
}
