import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Forgot Password | MCV" },
    { name: "description", content: "Get a reset email for your MCV account" },
  ];
};

export default function ForgotPassword() {
  return <>forgot password</>;
}
