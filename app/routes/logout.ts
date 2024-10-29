import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ROUTES } from "~/routes";
import {
  destroyUserSession,
  getTokenSession,
  USER_SESSION_KEY,
} from "~/session";
import { redirectWithSuccessToast } from "~/toast";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getTokenSession(request);

  return session.has(USER_SESSION_KEY)
    ? redirectWithSuccessToast({
        redirectTo: ROUTES.LOGIN,
        message: "Goodbye!",
        init: {
          headers: {
            "Set-Cookie": await destroyUserSession(session),
          },
        },
      })
    : redirect(ROUTES.LOGIN, {
        headers: {
          "Set-Cookie": await destroyUserSession(session),
        },
      });
}
