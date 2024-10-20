import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <>
      auth layout
      <Outlet />
    </>
  );
}
