import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Container } from "~/routes/_landing.dashboard/route";
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
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Order Summary
      </h3>

      {/* Chart Section */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Ordered"
              stroke="#d97706"
              strokeWidth={2}
              fillOpacity={0.2}
              fill="#fed7aa"
            />
            <Line
              type="monotone"
              dataKey="Delivered"
              stroke="#60a5fa"
              strokeWidth={2}
              fillOpacity={0.2}
              fill="#bfdbfe"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
