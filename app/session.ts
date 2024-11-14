import { createCookieSessionStorage } from "@remix-run/node";
import { cookieDefaultOptions } from "~/cookies";
import { redirectWithSuccessToast } from "~/toast";
import { ROUTES } from "~/routes";

type UserSession = {
  remember?: boolean;
  token: string;
  redirectTo: `${ROUTES}`;
  request: Request;
  message: string;
  init?: ResponseInit;
};

export const USER_SESSION_KEY = "_session";

export const {
  getSession: getUserSession,
  commitSession: commitUserSession,
  destroySession: destroyUserSession,
} = createCookieSessionStorage<{ [USER_SESSION_KEY]: string }>({
  cookie: {
    ...cookieDefaultOptions,
    name: USER_SESSION_KEY,
  },
});

export function getTokenSession({ headers }: Pick<Request, "headers">) {
  return getUserSession(headers.get("Cookie"));
}

export async function getUserToken({ headers }: Pick<Request, "headers">) {
  const session = await getTokenSession({ headers });
  return session.get(USER_SESSION_KEY);
}

export async function userHasSession({ headers }: Pick<Request, "headers">) {
  return (await getTokenSession({ headers })).has(USER_SESSION_KEY);
}

export async function createUserSession({
  remember,
  token,
  redirectTo,
  message,
  request,
  init,
}: UserSession) {
  const session = await getTokenSession({ headers: request.headers });
  session.set(USER_SESSION_KEY, token);

  // Merge custom Set-Cookie header with any existing headers from init
  const headers = {
    ...init?.headers, // Spread any headers passed in `init`
    "Set-Cookie": await commitUserSession(session, {
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
    }),
  };

  return redirectWithSuccessToast({
    redirectTo,
    message,
    init: {
      ...init,
      headers,
    },
  });
}
