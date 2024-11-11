import React from "react";

interface ItemProps {
  amount: number;
  label: string;
  Icon: React.ElementType;
  lastIndex?: boolean;
}

export const Item: React.FC<ItemProps> = ({
  amount,
  label,
  Icon,
  lastIndex = false,
}) => {
  return (
    <li
      className={`flex flex-col items-center gap-4 ${lastIndex ? "" : "border-r pr-8"}`}
    >
      <Icon width={30} height={30} />
      <div className="flex w-full justify-between gap-4">
        <span className="font-semibold">{amount}</span>
        <span>{label}</span>
      </div>
    </li>
  );
};
