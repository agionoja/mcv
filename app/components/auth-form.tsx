import React from "react";
import { Form, Link, useNavigation } from "@remix-run/react";
import logo from "~/assets/images/logo.svg";
import { v4 } from "uuid";
import { Input } from "~/components/Input";
import { ROUTE_CONFIG } from "~/route.config";

type AuthFormProps = {
  inputLabel?: {
    label: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  }[];
  headingText: string;
  type?: "login";
  message?: string;
  submitBtn: {
    default: string;
    submitting?: string;
  };
};

export function AuthForm({
  inputLabel,
  headingText,
  message,
  type,
  submitBtn,
}: AuthFormProps) {
  const navigation = useNavigation();
  const state = navigation.state;
  const checkbox = inputLabel?.filter(
    (input) => input.inputProps.type === "checkbox",
  );

  return (
    <div className={"flex w-90 flex-col gap-8"}>
      <div className={"flex w-full flex-col gap-6"}>
        <img className={"mx-auto"} src={logo} width={48} height={48} alt="" />
        <div className={"flex flex-col gap-3 text-center"}>
          <h1>{headingText}</h1>
          {message && <p>{message}</p>}
        </div>
      </div>

      <Form method={"POST"} className={"flex w-full flex-col gap-6"}>
        <ul className={"flex flex-col gap-5"}>
          {inputLabel?.map(
            ({ label, inputProps }) =>
              inputProps.type !== "checkbox" && (
                <li key={v4()}>
                  <label
                    className={`flex flex-col ${inputProps.type === "checkbox"} gap-2`}
                  >
                    <span>{label}</span>
                    <Input {...inputProps} />
                  </label>
                </li>
              ),
          )}
        </ul>

        {checkbox?.length &&
          checkbox?.length > 0 &&
          checkbox.length < 2 &&
          type === "login" && (
            <div className={"flex justify-between"}>
              <label className={"flex gap-2 text-[#48505E]"} key={v4()}>
                <input {...checkbox[0].inputProps} />
                <span>{checkbox[0].label}</span>
              </label>
              <Link
                className={"text-sm font-medium text-primary-cta"}
                to={ROUTE_CONFIG.FORGOT_PASSWORD}
              >
                Forgot password
              </Link>
            </div>
          )}

        <button
          className={
            "w-full rounded-4px bg-primary-cta px-4.5 py-2.5 font-medium text-white"
          }
        >
          {state === "submitting" ? submitBtn.submitting : submitBtn.default}
        </button>
      </Form>
    </div>
  );
}
