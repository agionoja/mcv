import { Form, FormProps, Link, useNavigation } from "@remix-run/react";
import React from "react";
import { FilePicker, FilePickerProps } from "~/components/file-picker";
import { ROUTE_CONFIG } from "~/route.config";
import { Input } from "~/components/Input";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Label = {
  label: string;
  inputProps: InputProps;
};

type PositionX = {
  left: number;
  right: number;
};

interface Props {
  formProps?: FormProps;
  formLabel: string;
  addBtnLabel: { default: string; submitting: string };
  cancelRoute: ROUTE_CONFIG;
  label: Label[];
  filePickerProps?: FilePickerProps;
  positionX?: PositionX;
}

export function AddForm({
  formLabel,
  addBtnLabel,
  cancelRoute,
  filePickerProps,
  label,
  ...props
}: Props) {
  const navigation = useNavigation();
  const state = navigation.state;

  return (
    <Form
      className={
        "flex w-[31.25rem] flex-col justify-center gap-6 rounded-lg bg-white px-8 py-7"
      }
      {...props.formProps}
    >
      <h2 className={"text-xl font-medium"}>{formLabel}</h2>

      <div className={"flex flex-col gap-8"}>
        {filePickerProps && <FilePicker {...filePickerProps} />}
        <ul className={"flex flex-col gap-4"}>
          {label.map(({ label, inputProps }, i) => (
            <li key={i}>
              <label className={"flex justify-between text-md font-medium"}>
                <span>{label}</span>
                <Input type="text" required={true} {...inputProps} />
              </label>
            </li>
          ))}
        </ul>

        <div className={"ml-auto flex gap-4 font-medium"}>
          <Link
            to={cancelRoute}
            className={"rounded-1 border px-6 py-2.5 text-md"}
          >
            {"Discard"}
          </Link>

          <button
            className={"rounded-1 bg-primary-cta px-4 py-2.5 text-white"}
            type={"submit"}
          >
            {state === "submitting"
              ? addBtnLabel.submitting
              : addBtnLabel.default}
          </button>
        </div>
      </div>
    </Form>
  );
}
