import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";
import { ROUTES } from "~/routes";
import { SuccessResponse } from "~/dto";

enum RESET_PASSWORD {
  OTP = "otp",
  NEW_PASSWORD = "newPassword",
  CONFIRM_PASSWORD = "confirmPassword",
}
export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password | MCV" },
    { name: "description", content: "Reset MCV password" },
  ];
};

export const action: ActionFunction = async function ({ request }) {
  const formData = await request.formData();

  const { data, error } = await fetchClient<SuccessResponse<{ data: null }>>({
    endpoint: END_POINT.RESET_PASSWORD,
    init: {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (error) {
    console.log(error);
    return redirectWithErrorToast({
      redirectTo: ROUTES.RESET_PASSWORD,
      message: error.message,
    });
  }

  return redirectWithSuccessToast({
    redirectTo: ROUTES.LOGIN,
    message: data?.message,
  });
};

export default function ResetPassword() {
  return (
    <AuthForm
      inputLabel={[
        {
          label: "OTP",
          inputProps: {
            type: "text",
            name: RESET_PASSWORD.OTP,
            required: true,
            placeholder: "Enter your otp",
          },
        },
        {
          label: "New Password",
          inputProps: {
            type: "password",
            name: RESET_PASSWORD.CONFIRM_PASSWORD,
            required: true,
            placeholder: "Enter your new Password",
          },
        },
        {
          label: "Confirm Password",
          inputProps: {
            type: "password",
            name: RESET_PASSWORD.NEW_PASSWORD,
            required: true,
            placeholder: "Confirm your new password",
          },
        },
      ]}
      headingText={"Reset your Password"}
      submitBtn={{
        default: "Reset Password",
        submitting: "Resetting password...",
      }}
    />
  );
}
