import React, { HTMLAttributes } from "react";
import { IconProps } from "~/components/icons";

export interface ItemProps {
  amount: number | string;
  label: string;
  Icon: React.ElementType<IconProps>;
  lastIndex?: boolean;
  statsContainer?: HTMLAttributes<HTMLDivElement>;
}

export const Item: React.FC<ItemProps> = ({
  amount,
  label,
  Icon,
  lastIndex = false,
  statsContainer: { className, ...rest } = {},
}) => {
  return (
    <li
      className={`flex flex-col items-center gap-2 ${lastIndex ? "" : "border-"}`}
    >
      <Icon width={30} height={30} />
      <div
        className={`flex w-full justify-between gap-2 ${className}`}
        {...rest}
      >
        <span className="font-semibold">{amount}</span>
        <span className={"text-sm"}>{label}</span>
      </div>
    </li>
  );
};
