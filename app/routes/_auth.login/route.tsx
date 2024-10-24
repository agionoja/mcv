import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTE_CONFIG } from "~/route.config";
import { redirectWithSuccessToast } from "~/toast";

enum LOGIN {
  PASSWORD = "password",
  EMAIL = "email",
  REMEMBER = "remember",
}

export const action: ActionFunction = async function ({ request }) {
  // const loginFormData = await request.formData();
  // const loginData = Object.fromEntries(loginFormData);

  return redirectWithSuccessToast({
    redirectTo: ROUTE_CONFIG.DASHBOARD,
    message: "Welcome Back!",
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
            minLength: 8,
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
