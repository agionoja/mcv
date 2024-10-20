import { Outlet } from "@remix-run/react";
import { SideBar } from "~/routes/_landing/side-bar";
import { TopBar } from "~/routes/_landing/top-bar";

export default function Landing() {
  return (
    <div className={"flex min-h-screen w-full bg-border-color"}>
      <SideBar />
      <div className={"h-full w-[86.11%] 2xl:w-[80%]"}>
        <TopBar />
        <div className="h-full w-full px-8 py-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
