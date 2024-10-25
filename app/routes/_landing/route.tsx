import { Outlet } from "@remix-run/react";
import { SideBar } from "~/routes/_landing/side-bar";
import { TopBar } from "~/routes/_landing/top-bar";

export default function Landing() {
  return (
    <div className="flex h-240 w-full bg-border-color">
      <SideBar />

      <div className="flex w-[86.11%] flex-col overflow-hidden 2xl:w-[80%]">
        <TopBar />

        <div className="w-full flex-1 overflow-y-auto px-8 py-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
