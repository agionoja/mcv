import { Container } from "~/routes/_landing.dashboard/route";
import React, { HTMLAttributes } from "react";
import { Item } from "~/routes/_landing.dashboard/item";

type Props = {
  data: { amount: number; label: string; Icon: React.FC }[];
  label: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
};

export const Overview = ({
  data,
  containerProps: { className, ...rest },
  label,
}: Props) => {
  return (
    <Container
      className={`flex flex-col gap-8 rounded-lg ${className}`}
      {...rest}
    >
      <h2>{label}</h2>
      <ul className="flex justify-between gap-8">
        {data.map((item, index) => (
          <Item
            key={index}
            amount={item.amount}
            label={item.label}
            Icon={item.Icon}
            lastIndex={data.length - 1 === index}
          />
        ))}
      </ul>
    </Container>
  );
};