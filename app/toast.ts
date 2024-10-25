import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { cookieDefaultOptions } from "~/cookies";
import type { TypeOptions } from "react-toastify";
import { z } from "zod";

// Define schemas
const toastMessageSchema = z.object({
  message: z.string(),
  type: z.custom<TypeOptions>(),
});

const flashSessionValuesSchema = z.object({
  toast: toastMessageSchema.optional(),
});

// Types inferred from schemas
type FlashSessionValues = z.infer<typeof flashSessionValuesSchema>;
type ToastMessage = z.infer<typeof toastMessageSchema>;

// Common type for redirect functions
interface RedirectArgs {
  redirectTo: string;
  init?: ResponseInit;
}

// Common type for functions with a flash message
interface RedirectWithFlashArgs extends RedirectArgs {
  flash: FlashSessionValues;
}

// Common type for functions with a toast message
interface RedirectWithToastArgs extends RedirectArgs {
  toast: ToastMessage;
}

type FlashMessage = {
  flash: FlashSessionValues;
  headers?: ResponseInit["headers"];
};

// Create cookie session storage
export const flashSessionStorage = createCookieSessionStorage<{
  flash: FlashSessionValues;
}>({
  cookie: {
    ...cookieDefaultOptions,
    name: "__flash",
  },
});

// Function to get session from request headers
function getSessionFromRequest({ headers }: Request) {
  return flashSessionStorage.getSession(headers.get("Cookie"));
}

export async function getFlashSession(request: Request) {
  // We retrieve the session by using the current requests cookie.
  const session = await getSessionFromRequest(request);
  // We validate that our data is correct via zod
  const result = flashSessionValuesSchema.safeParse(session.get("flash"));
  // If it isn't we set it to undefined
  const flash = result.success ? result.data : undefined;
  // We create the headers to purge the message from the cookie storage
  const headers = new Headers({
    "Set-Cookie": await flashSessionStorage.commitSession(session),
  });
  // Headers need to be returned to purge the flash storage
  return { flash, headers };
}

// Flash message utility to append flash to headers
export async function flashMessage({ flash, headers }: FlashMessage) {
  const session = await flashSessionStorage.getSession();
  session.flash("flash", flash);

  const cookie = await flashSessionStorage.commitSession(session);
  const newHeaders = new Headers(headers);

  newHeaders.append("Set-Cookie", cookie);
  return newHeaders;
}

// General redirect with flash message
export async function redirectWithFlash({
  redirectTo,
  flash,
  init,
}: RedirectWithFlashArgs) {
  return redirect(redirectTo, {
    ...init,
    headers: await flashMessage({ flash, headers: init?.headers }),
  });
}

// General redirect with toast message
export async function redirectWithToast({
  redirectTo,
  toast,
  init,
}: RedirectWithToastArgs) {
  return redirectWithFlash({ redirectTo, flash: { toast }, init });
}

// Error toast redirect function
export function redirectWithErrorToast({
  redirectTo,
  message,
  init,
}: RedirectArgs & { message: string }) {
  return redirectWithToast({
    redirectTo,
    toast: { type: "error", message },
    init,
  });
}

// Success toast redirect function
export function redirectWithSuccessToast({
  redirectTo,
  message,
  init,
}: RedirectArgs & { message: string }) {
  return redirectWithToast({
    redirectTo,
    toast: { type: "success", message },
    init,
  });
}

export function redirectWithInfoToast({
  redirectTo,
  message,
  init,
}: RedirectArgs & { message: string }) {
  return redirectWithToast({
    redirectTo,
    toast: { type: "info", message },
    init,
  });
}

export function redirectWithWarning({
  redirectTo,
  message,
  init,
}: RedirectArgs & { message: string }) {
  return redirectWithToast({
    redirectTo,
    toast: { type: "info", message },
    init,
  });
}
