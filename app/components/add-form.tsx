import { Form, FormProps, Link, useNavigation } from "@remix-run/react";
import React, { forwardRef } from "react";
import { FilePicker, FilePickerProps } from "~/components/file-picker";
import { ROUTES } from "~/routes";
import { Input } from "~/components/Input";
import { Select, SelectProps as ReactSelectProps } from "~/components/select";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type InputLabel = {
  label: string;
  inputProps?: InputProps;
  type: "input";
  className?: string;
};

interface SelectProps extends ReactSelectProps {
  type: "select";
  label: string;
}

type Control = InputLabel | SelectProps;

type PositionX = {
  left: number;
  right: number;
};

type Props = {
  formProps?: FormProps;
  formLabel: string;
  addBtnLabel: { default: string; submitting: string };
  cancelRoute: ROUTES;
  filePickerProps?: FilePickerProps;
  positionX?: PositionX;
  control: Control[];
};

// Specify the ref type (HTMLFormElement) and props type (Props) with forwardRef
export const AddForm = forwardRef<HTMLFormElement, Props>(function AddForm(
  { formLabel, addBtnLabel, cancelRoute, filePickerProps, control, ...props },
  ref,
) {
  const navigation = useNavigation();
  const state = navigation.state;

  return (
    <Form
      ref={ref}
      className="flex w-[31.25rem] flex-col justify-center gap-6 rounded-lg bg-white px-8 py-7"
      {...props.formProps}
    >
      <h2 className="text-xl font-medium">{formLabel}</h2>

      <div className="flex flex-col gap-8">
        {filePickerProps && <FilePicker {...filePickerProps} />}
        <ul className="flex flex-col gap-4">
          {control.map((el, index) => (
            <li key={index}>
              <label
                className={`flex justify-between gap-2 text-md font-medium ${el.className}`}
              >
                <span>{el.label}</span>
                {el.type === "input" ? (
                  <Input required {...el.inputProps} />
                ) : (
                  <Select {...el} />
                )}
              </label>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex gap-4 font-medium">
          <Link
            to={cancelRoute}
            className="rounded-4px border px-6 py-2.5 text-md"
          >
            Discard
          </Link>

          <button
            className="btn bg-primary-cta text-white"
            type="submit"
            disabled={state === "submitting"}
          >
            {state === "submitting"
              ? addBtnLabel.submitting
              : addBtnLabel.default}
          </button>
        </div>
      </div>
    </Form>
  );
});
