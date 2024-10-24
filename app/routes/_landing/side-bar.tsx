import logo from "~/assets/images/logo.png";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { ROUTE_CONFIG } from "~/route.config";
import {
  HomeIcon,
  IconProps,
  InventoryIcon,
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
        "gap- w-full-[13.89%] flex h-[60rem] shrink-0 flex-col justify-between rounded-br-lg rounded-tr-lg border-r bg-white px-6 pb-8 pt-6 2xl:w-1/5"
      }
    >
      <div className={"flex flex-col gap-8"}>
        <Link to={"/"} className={"flex items-center gap-3 px-4"}>
          <img src={logo} width={48} height={48} alt="MCV logo" />
          <h2 className={"text-sm font-semibold uppercase text-primary-cta"}>
            Moscord cosmetic venture
          </h2>
        </Link>

        <nav>
          <ul className={"flex flex-col gap-3"}>
            <li>
              {RenderNavLink(
                ROUTE_CONFIG.DASHBOARD,
                "Dashboard",
                HomeIcon,
                "stroke",
              )}
            </li>
            <li>
              {RenderNavLink(
                ROUTE_CONFIG.INVENTORY,
                "Inventory",
                InventoryIcon,
              )}
            </li>
            <li>
              {RenderNavLink(
                ROUTE_CONFIG.REPORTS,
                "Reports",
                ReportIcon,
                "stroke",
              )}
            </li>
            <li>
              {RenderNavLink(ROUTE_CONFIG.SUPPLIERS, "Suppliers", UserIcon)}
            </li>
            <li>{RenderNavLink(ROUTE_CONFIG.ORDERS, "Orders", OrderIcon)}</li>
            <li>
              {RenderNavLink(
                ROUTE_CONFIG.MANAGE_STORE,
                "Manage Store",
                ManageStoreIcon,
              )}
            </li>
          </ul>
        </nav>
      </div>

      <ul>
        <li>
          {RenderNavLink(ROUTE_CONFIG.SETTINGS, "Settings", SettingsIcon)}
        </li>
        <li>{RenderNavLink(ROUTE_CONFIG.LOGOUT, "Logout", LogoutIcon)}</li>
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

  return to === ROUTE_CONFIG.LOGOUT ? (
    <a className={"nav-links"} href={to}>
      <IconComponent
        {...{
          [activeStyleProp]: location.pathname.includes(to)
            ? primaryCta
            : undefined,
        }}
      />
      <span>{label}</span>
    </a>
  ) : (
    <NavLink prefetch={"intent"} className={"nav-links"} to={to}>
      <IconComponent
        {...{
          [activeStyleProp]: location.pathname.includes(to)
            ? primaryCta
            : undefined,
        }}
      />
      <span>{label}</span>
    </NavLink>
  );
}
