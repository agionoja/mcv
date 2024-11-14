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
import { Container } from "./container";

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
          <defs>
            {/* Define gradient for Purchases */}
            <linearGradient id="gradientPurchases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1570EF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#1570EF" stopOpacity={0.3} />
            </linearGradient>

            {/* Define gradient for Sales */}
            <linearGradient id="gradientSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12B76A" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#12B76A" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Rounded bars with gradients */}
          <Bar
            dataKey="Purchases"
            fill="url(#gradientPurchases)"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Sales"
            fill="url(#gradientSales)"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};
