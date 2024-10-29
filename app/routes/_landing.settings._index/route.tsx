import { redirect } from "@remix-run/node";
import { ROUTES } from "~/routes";

export function loader() {
  return redirect(ROUTES.SETTINGS_SECURITY);
}
