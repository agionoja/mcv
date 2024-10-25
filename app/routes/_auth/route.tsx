import { Outlet } from "@remix-run/react";
import { LogoIcon } from "~/components/icons";

export default function AuthLayout() {
  return (
    <div className={"flex h-240 items-center justify-center gap-[23rem]"}>
      <LogoIcon width={250} height={250} />
      <Outlet />
    </div>
  );
}
