import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password | MCV" },
    { name: "description", content: "Reset MCV password" },
  ];
};

export default function ResetPassword() {
  return <>reset password</>;
}
