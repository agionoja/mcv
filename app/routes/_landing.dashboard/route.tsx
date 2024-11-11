import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import fetchClient, { END_POINT } from "~/fetch-client";
import { getUserToken } from "~/session";
import { HTMLAttributes } from "react";
import {
  CostIcon,
  ProfitIcon,
  RevenueIcon,
  SalesIcon,
} from "~/components/icons";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import { ROUTES } from "~/routes";
import { Overview } from "~/routes/_landing.dashboard/overview";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | MCV" },
    { name: "description", content: "MCV account dashboard" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getUserToken(request);
  const { data, error } = await fetchClient({
    endpoint: END_POINT.DASHBOARD,
    token: token,
  });

  console.log(data);
  return { data, error };
}

export function clientLoader(args: ClientLoaderFunctionArgs) {
  return cacheClientLoader(args, { key: ROUTES.DASHBOARD });
}

const data = [
  { amount: 830, label: "Sales", Icon: SalesIcon },
  { amount: 1830, label: "Revenue", Icon: RevenueIcon },
  { amount: 868, label: "Profit", Icon: ProfitIcon },
  { amount: 17432, label: "Cost", Icon: CostIcon },
];

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <Overview
          label={"Sales Overview"}
          containerProps={{
            className: "col-span-8", // Spanning 8 columns
          }}
          data={data}
        />
        <Overview
          label={"Inventory Summary"}
          containerProps={{
            className: "col-span-4", // Spanning 4 columns
          }}
          data={data.slice(0, 2)}
        />
        <Overview
          label={"Purchase Overview"}
          containerProps={{
            className: "col-span-8", // Spanning 8 columns
          }}
          data={data}
        />
        <Overview
          label={"Product Summary"}
          containerProps={{
            className: "col-span-4", // Spanning 4 columns
          }}
          data={data.slice(0, 2)}
        />
      </div>
    </>
  );
}

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-white p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
