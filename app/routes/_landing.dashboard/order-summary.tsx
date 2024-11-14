import {
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Container } from "./container";
import { HTMLAttributes } from "react";

type OrderSummaryChartProps = {
  data: { name: string; Ordered: number; Delivered: number }[];
  containerProps?: HTMLAttributes<HTMLDivElement>;
};

export function OrderSummaryChart({
  data,
  containerProps: { className, ...rest } = {},
}: OrderSummaryChartProps) {
  return (
    <Container className={`flex w-full flex-col ${className}`} {...rest}>
      <h3 style={{ textAlign: "center" }}>Order Summary</h3>

      {/* Chart Section */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="colorOrdered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Areas with Gradient Fills */}
            <Area
              type="monotone"
              dataKey="Ordered"
              stroke="#d97706"
              strokeWidth={2}
              fill="url(#colorOrdered)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="Delivered"
              stroke="#60a5fa"
              strokeWidth={2}
              fill="url(#colorDelivered)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
