import { Outlet } from "@remix-run/react";
import logo from "~/assets/images/logo.svg";

export default function AuthLayout() {
  return (
    <div className={"h-240 flex items-center justify-center gap-[23rem]"}>
      <div className={"flex flex-col items-center gap-4"}>
        <img
          height={250.399}
          width={250}
          className={"shrink-0"}
          src={logo}
          alt="MCV logo"
        />
        <span
          className={"shrink-0 text-display-sm font-semibold text-[#009ed8]"}
        >
          MCV
        </span>
      </div>
      <Outlet />
    </div>
  );
}
