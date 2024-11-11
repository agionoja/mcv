import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTES } from "~/routes";
import fetchClient, { END_POINT } from "~/fetch-client";
import { createUserSession } from "~/session";
import { useEffect, useRef } from "react";
import { useActionData } from "@remix-run/react";
import { toast } from "react-toastify";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
enum LOGIN {
  PASSWORD = "password",
  EMAIL = "email",
  REMEMBER = "remember",
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const password = formData.get(LOGIN.PASSWORD);
  const email = formData.get(LOGIN.EMAIL);
  const remember = formData.get(LOGIN.REMEMBER);

  const { data: userRes, error } = await fetchClient<{
    statusCode: number;
    message: string;
    data: { user: User; token: string };
  }>({
    endpoint: END_POINT.LOGIN,
    init: {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (error) {
    return { error };
  }

  return createUserSession({
    redirectTo: ROUTES.DASHBOARD,
    remember: remember === "on",
    request,
    message: `Welcome Back ${userRes?.data.user.name.split(" ")[0]}`,
    token: userRes?.data.token,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Login | MCV" },
    { name: "description", content: "Login to your MCV account" },
  ];
};

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const actionData = useActionData<typeof action>();
  const error =
    actionData && "error" in actionData ? actionData.error : undefined;

  useEffect(() => {
    if (emailRef.current && error) {
      toast(error.message, { type: "error" });
      emailRef.current.select();
    }
  }, [error]);

  return (
    <AuthForm
      type={"login"}
      submitBtn={{
        default: "Login",
        submitting: "Login in...",
      }}
      headingText={"Log in to your account"}
      message={"Welcome back! Please enter your details"}
      inputLabel={[
        {
          label: "email",
          inputProps: {
            type: "email",
            ref: emailRef,
            name: LOGIN.EMAIL,
            placeholder: "Enter your email",
            required: true,
          },
        },
        {
          label: "password",
          inputProps: {
            type: "password",
            name: LOGIN.PASSWORD,
            required: true,
            minLength: 6,
          },
        },
        {
          label: "Remember for 30 days",
          inputProps: {
            type: "checkbox",
            name: LOGIN.REMEMBER,
          },
        },
      ]}
    />
  );
}
