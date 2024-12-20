import { Link, NavLink, useLocation } from "@remix-run/react";
import { ROUTES } from "~/routes";
import {
  HomeIcon,
  IconProps,
  InventoryIcon,
  LogoIcon,
  LogoutIcon,
  ManageStoreIcon,
  OrderIcon,
  ReportIcon,
  SettingsIcon,
  UserIcon,
} from "~/components/icons";
import React from "react";

export function SideBar() {
  return (
    <header
      className={
        "gap- w-full-[13.89%] flex h-full shrink-0 flex-col justify-between rounded-tr-lg border-r bg-white px-6 pb-8 pt-6 2xl:w-1/5"
      }
    >
      <div className={"flex flex-col gap-8"}>
        <Link to={"/"} className={"flex items-center gap-3 px-4"}>
          <LogoIcon width={58} height={58} />
          <h2 className={"text-sm font-semibold uppercase text-primary-cta"}>
            Moscord cosmetic venture
          </h2>
        </Link>

        <nav>
          <ul className={"flex flex-col gap-3"}>
            <li>
              {RenderNavLink(ROUTES.DASHBOARD, "Dashboard", HomeIcon, "stroke")}
            </li>
            <li>
              {RenderNavLink(ROUTES.INVENTORIES, "Inventories", InventoryIcon)}
            </li>
            <li>
              {RenderNavLink(ROUTES.REPORTS, "Reports", ReportIcon, "stroke")}
            </li>
            <li>{RenderNavLink(ROUTES.SUPPLIERS, "Suppliers", UserIcon)}</li>
            <li>{RenderNavLink(ROUTES.USERS, "Users", UserIcon)}</li>
            <li>{RenderNavLink(ROUTES.ORDERS, "Orders", OrderIcon)}</li>
            <li>
              {RenderNavLink(
                ROUTES.MANAGE_STORE,
                "Manage Store",
                ManageStoreIcon,
              )}
            </li>
          </ul>
        </nav>
      </div>

      <ul>
        <li>{RenderNavLink(ROUTES.SETTINGS, "Settings", SettingsIcon)}</li>
        <li>{RenderNavLink(ROUTES.LOGOUT, "Logout", LogoutIcon)}</li>
      </ul>
    </header>
  );
}

function RenderNavLink(
  to: string,
  label: string,
  IconComponent: React.FC<IconProps>,
  activeStyleProp: "fill" | "stroke" = "fill",
) {
  const primaryCta = "#1570EF";
  const location = useLocation();

  return to === ROUTES.LOGOUT ? (
    <Link reloadDocument className={"nav-links"} to={to}>
      <IconComponent
        {...{
          [activeStyleProp]: location.pathname.includes(to)
            ? primaryCta
            : "#858D9D",
        }}
      />
      <span>{label}</span>
    </Link>
  ) : (
    <NavLink prefetch={"intent"} className={"nav-links"} to={to}>
      <IconComponent
        {...{
          [activeStyleProp]: location.pathname.includes(to)
            ? primaryCta
            : "#858D9D",
        }}
      />
      <span>{label}</span>
    </NavLink>
  );
}
