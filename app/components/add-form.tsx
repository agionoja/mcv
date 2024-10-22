import { v4 } from "uuid";
import { Form, FormProps, Link, useNavigation } from "@remix-run/react";
import React, { useEffect, useRef } from "react";
import { FilePicker, FilePickerProps } from "~/components/file-picker";
import { ROUTE_CONFIG } from "~/route.config";
import { Input } from "~/components/Input";
import { Select, SelectProps as ReactSelectProps } from "~/components/select";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type InputLabel = {
  label: string;
  inputProps?: InputProps;
  type: "input";
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
  cancelRoute: ROUTE_CONFIG;
  filePickerProps?: FilePickerProps;
  showFilePicker?: boolean;
  positionX?: PositionX;
  control: Control[];
};

export function AddForm({
  formLabel,
  addBtnLabel,
  cancelRoute,
  filePickerProps,
  showFilePicker = false,
  control,
  ...props
}: Props) {
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const state = navigation.state;

  useEffect(() => {
    if (state !== "submitting") {
      formRef?.current?.reset();
    }
  }, [state]);

  return (
    <Form
      ref={formRef}
      className="flex w-[31.25rem] flex-col justify-center gap-6 rounded-lg bg-white px-8 py-7"
      {...props.formProps}
    >
      <h2 className="text-xl font-medium">{formLabel}</h2>

      <div className="flex flex-col gap-8">
        {showFilePicker && <FilePicker {...filePickerProps} />}
        <ul className="flex flex-col gap-4">
          {control.map((el) => {
            return (
              <li key={v4()}>
                <label className="flex justify-between gap-2 text-md font-medium">
                  <span>{el.label}</span>
                  {el.type === "input" ? (
                    <Input required {...el.inputProps} />
                  ) : (
                    <Select {...el} />
                  )}
                </label>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex gap-4 font-medium">
          <Link
            to={cancelRoute}
            className="rounded-1 border px-6 py-2.5 text-md"
          >
            Discard
          </Link>

          <button
            className="rounded-1 bg-primary-cta px-4 py-2.5 text-white"
            type="submit"
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
