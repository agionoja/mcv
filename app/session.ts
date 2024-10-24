import { createCookieSessionStorage } from "@remix-run/node";
import { cookieDefaultOptions } from "~/cookies";
import { redirectWithSuccessToast } from "~/toast";

type UserSession = {
  remember?: boolean;
  token: string;
  redirectTo: string;
  request: Request;
  message: string;
};

const SESSION_KEY = "_session" as const;

export const {
  getSession: getUserSession,
  commitSession: commitUserSession,
  destroySession: destroyUserSession,
} = createCookieSessionStorage<{ [SESSION_KEY]: string }>({
  cookie: {
    ...cookieDefaultOptions,
    name: SESSION_KEY,
  },
});

export function getTokenSession({ headers }: Pick<Request, "headers">) {
  return getUserSession(headers.get("Cookie"));
}

export async function getUserToken({ headers }: Pick<Request, "headers">) {
  const session = await getTokenSession({ headers });
  return session.get(SESSION_KEY);
}

export async function createUserSession({
  remember,
  token,
  redirectTo,
  message,
  request,
}: UserSession) {
  const session = await getTokenSession({ headers: request.headers });
  session.set(SESSION_KEY, token);

  return redirectWithSuccessToast({
    redirectTo,
    message,
    init: {
      headers: {
        "Set-Cookie": await commitUserSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 30 // 30 days
            : undefined,
        }),
      },
    },
  });
}
