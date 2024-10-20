import { Form, FormProps } from "@remix-run/react";
import React from "react";
import { IconProps } from "~/components/icons";
import { FilePicker, FilePickerProps } from "~/components/file-picker";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Label = {
  label: string;
  inputProps: InputProps;
};

interface Props {
  formProps?: FormProps;
  formLabel: string;
  addBtnLabel: string;
  cancelBtnLabel?: string;
  label: Label[];
  filePickerProps: FilePickerProps;
}

export function AddForm({
  formLabel,
  addBtnLabel,
  cancelBtnLabel,
  filePickerProps,
  label,
  ...props
}: Props) {
  return (
    <Form
      className={
        "flex w-[31.25rem] flex-col justify-center gap-4 rounded-lg bg-white px-8 py-7"
      }
      {...props.formProps}
    >
      <h2 className={"text-xl font-medium"}>{formLabel}</h2>

      <FilePicker {...filePickerProps} />
    </Form>
  );
}
