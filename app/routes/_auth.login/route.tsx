import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTES } from "~/routes";
import { redirectWithErrorToast } from "~/toast";
import fetchClient, { END_POINT } from "~/fetch-client";
import { createUserSession } from "~/session";
import { User } from "~/dto";

enum LOGIN {
  PASSWORD = "password",
  EMAIL = "email",
  REMEMBER = "remember",
}

export const action: ActionFunction = async function ({ request }) {
  const formData = await request.formData();
  const password = formData.get(LOGIN.PASSWORD);
  const email = formData.get(LOGIN.EMAIL);
  const remember = formData.get(LOGIN.REMEMBER);

  const { data, error } = await fetchClient<User>({
    endpoint: END_POINT.LOGIN,
    init: {
      method: "POST",
      body: JSON.stringify({ password, email }),
    },
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.LOGIN,
      message: error.message,
    });
  }

  return createUserSession({
    redirectTo: ROUTES.DASHBOARD,
    remember: remember === "on",
    request,
    message: "Welcome Back!",
    token: data.data.token,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Login | MCV" },
    { name: "description", content: "Login to your MCV account" },
  ];
};

export default function Login() {
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
            name: LOGIN.EMAIL,
            placeholder: "Enter your email",
            required: true,
            // pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            // title: "Please enter a valid email address",
          },
        },
        {
          label: "password",
          inputProps: {
            type: "password",
            name: LOGIN.PASSWORD,
            required: true,
            minLength: 6,
            // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
            // title:
            //   "Password must be at least 8 characters long and include uppercase, lowercase letters, and a number",
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
