import { redirect } from "@remix-run/node";
import { ROUTE_CONFIG } from "~/route.config";

export function loader() {
  return redirect(ROUTE_CONFIG.DASHBOARD);
}
