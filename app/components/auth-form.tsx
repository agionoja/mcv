import { Form, FormProps, Link, useNavigation } from "@remix-run/react";
import { Input, InputProps } from "~/components/Input";
import { ROUTES } from "~/routes";
import { LogoIcon } from "~/components/icons";

type AuthFormProps = FormProps & {
  inputLabel?: {
    label: string;
    inputProps: InputProps;
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
  ...props
}: AuthFormProps) {
  const navigation = useNavigation();
  const state = navigation.state;
  const checkbox = inputLabel?.filter(
    (input) => input.inputProps.type === "checkbox",
  );

  return (
    <div className={"flex w-90 flex-col gap-8"}>
      <div className={"flex w-full flex-col gap-6"}>
        <LogoIcon className={"mx-auto"} width={48} height={48} />
        <div className={"flex flex-col gap-3 text-center"}>
          <h1>{headingText}</h1>
          {message && <p>{message}</p>}
        </div>
      </div>

      <Form method={"POST"} className={"flex w-full flex-col gap-6"} {...props}>
        <ul className={"flex flex-col gap-5"}>
          {inputLabel?.map(({ label, inputProps }) =>
            inputProps.type !== "checkbox" ? (
              <li key={inputProps.name || label}>
                <label className="flex flex-col gap-2">
                  <span>{label}</span>
                  <Input {...inputProps} />
                </label>
              </li>
            ) : null,
          )}
        </ul>

        {/* Checkbox rendering */}
        {checkbox?.length === 1 && type === "login" && (
          <div className={"flex justify-between"}>
            <label className={"flex gap-2 text-[#48505E]"}>
              <input {...checkbox[0].inputProps} />
              <span>{checkbox[0].label}</span>
            </label>
            <Link
              className={"text-sm font-medium text-primary-cta"}
              to={ROUTES.FORGOT_PASSWORD}
            >
              Forgot password
            </Link>
          </div>
        )}

        <button
          className={
            "w-full rounded-4px bg-primary-cta px-4.5 py-2.5 font-medium text-white"
          }
          type="submit"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? submitBtn.submitting : submitBtn.default}
        </button>
      </Form>
    </div>
  );
}
