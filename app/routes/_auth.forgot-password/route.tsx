import { ActionFunction, MetaFunction, redirect } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTE_CONFIG } from "~/route.config";

enum FORGOT_PASSWORD {
  EMAIL = "email",
}

export const action: ActionFunction = async function ({ request }) {
  // const formData = await request.formData();
  // const email = formData.get(FORGOT_PASSWORD.EMAIL);

  return redirect(
    ROUTE_CONFIG.RESET_PASSWORD.replace(
      ":token",
      "make-sure-you-use-the-email-token-later",
    ),
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Forgot Password | MCV" },
    { name: "description", content: "Get a reset email for your MCV account" },
  ];
};

export default function ForgotPassword() {
  return (
    <AuthForm
      inputLabel={[
        {
          label: "Email",
          inputProps: {
            type: "email",
            name: FORGOT_PASSWORD.EMAIL,
            required: true,
            placeholder: "Enter your email",
          },
        },
      ]}
      headingText={"Enter your email"}
      submitBtn={{
        default: "Get reset link",
        submitting: "Getting  reset link...",
      }}
    />
  );
}
