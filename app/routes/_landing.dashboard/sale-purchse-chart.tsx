import React, { HTMLAttributes } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Container } from "~/routes/_landing.dashboard/route";

interface SalesPurchaseChartProps {
  data: Array<{ name: string; Purchases: number; Sales: number }>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const SalesPurchaseChart: React.FC<SalesPurchaseChartProps> = ({
  data,
  containerProps: { className, ...rest } = {},
}) => {
  return (
    <Container className={`flex h-full w-full flex-col ${className}`} {...rest}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sales & Purchase</h2>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          height={205}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Purchases" fill="#1570EF" />
          <Bar dataKey="Sales" fill="#12B76A" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};
