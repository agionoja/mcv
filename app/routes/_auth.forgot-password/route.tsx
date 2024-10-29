import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTES } from "~/routes";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";
import { SuccessResponse } from "~/dto";

enum FORGOT_PASSWORD {
  EMAIL = "email",
}

export const action: ActionFunction = async function ({ request }) {
  const formData = await request.formData();
  const email = formData.get(FORGOT_PASSWORD.EMAIL);

  const { data, error } = await fetchClient<SuccessResponse<{ data: null }>>({
    endpoint: END_POINT.FORGOT_PASSWORD,
    init: {
      method: "POST",
      body: JSON.stringify({ email }),
    },
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.FORGOT_PASSWORD,
      message: error.message,
      init: {
        status: error.statusCode,
      },
    });
  }

  return redirectWithSuccessToast({
    redirectTo: ROUTES.RESET_PASSWORD,
    message: data?.message,
  });
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
