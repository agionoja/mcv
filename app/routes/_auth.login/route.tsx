import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";

enum LOGIN {
  PASSWORD = "password",
  EMAIL = "email",
  REMEMBER = "remember",
}

export const action: ActionFunction = async function ({ request }) {
  const loginFormData = await request.formData();
  const loginData = Object.fromEntries(loginFormData);

  console.log({ email: loginData[LOGIN.EMAIL], loginData });

  return json({ loginData });
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
            placeholder: "Enter your password",
            required: true,
            // Todo: write an email regex here
          },
        },
        {
          label: "password",
          inputProps: {
            type: "password",
            name: LOGIN.PASSWORD,
            required: true,
            minLength: 8,
            // Todo: write a password regex here
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
    ></AuthForm>
  );
}
