import { ActionFunction, MetaFunction, redirect } from "@remix-run/node";
import { AuthForm } from "~/components/auth-form";
import { ROUTE_CONFIG } from "~/route.config";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password | MCV" },
    { name: "description", content: "Reset MCV password" },
  ];
};

export const action: ActionFunction = async function ({ params }) {
  console.log(params);
  return redirect(ROUTE_CONFIG.LOGIN);
};

export default function ResetPassword() {
  return (
    <AuthForm
      headingText={"Reset your Password"}
      submitBtn={{
        default: "Reset Password",
        submitting: "Resetting password...",
      }}
    />
  );
}
