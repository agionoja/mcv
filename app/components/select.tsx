import { useId } from "react";

import ReactSelect, {
  Props as ReactSelectProps,
  GroupBase,
} from "react-select";

interface Option {
  value: string;
  label: string;
}

export interface SelectProps
  extends ReactSelectProps<Option, boolean, GroupBase<Option>> {}

export function Select({ options, ...props }: SelectProps) {
  return <ReactSelect options={options} {...props} instanceId={useId()} />;
}
