import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import fetchClient, { END_POINT } from "~/fetch-client";
import { getUserToken } from "~/session";
import { HTMLAttributes } from "react";
import {
  CancelIcon,
  CategoriesIcon,
  CostIcon,
  LocationIcon,
  ProfitIcon,
  PurchaseIcon,
  QuantityIcon,
  RevenueIcon,
  SalesIcon,
  UserIcon,
} from "~/components/icons";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
import { ROUTES } from "~/routes";
import { Overview } from "~/routes/_landing.dashboard/overview";
import { Table } from "~/components/table";

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

const salesData = [
  { amount: 830, label: "Sales", Icon: SalesIcon },
  { amount: 1830, label: "Revenue", Icon: RevenueIcon },
  { amount: 868, label: "Profit", Icon: ProfitIcon },
  { amount: 17432, label: "Cost", Icon: CostIcon },
];
const inventoryData = [
  { amount: 830, label: "Quantity in Hand", Icon: QuantityIcon },
  { amount: 1830, label: "To be received", Icon: LocationIcon },
];
const purchaseData = [
  { amount: 830, label: "Purchase", Icon: PurchaseIcon },
  { amount: 1830, label: "Cost", Icon: CostIcon },
  { amount: 868, label: "Cancel", Icon: CancelIcon },
  { amount: 17432, label: "Return", Icon: ProfitIcon },
];
const productData = [
  { amount: 830, label: "Number of Suppliers", Icon: UserIcon },
  { amount: 1830, label: "Number of Categories", Icon: CategoriesIcon },
];

const topSellingStock = [
  {
    name: "Surf Excel",
    soldQuantity: 100,
    remainingQuantity: 12,
    price: 100,
  },
  {
    name: "Orange",
    soldQuantity: 30,
    remainingQuantity: 20,
    price: 50,
  },
  {
    name: "Rin",
    soldQuantity: 20,
    remainingQuantity: 12,
    price: 70,
  },
  {
    name: "Parl G",
    soldQuantity: 40,
    remainingQuantity: 10,
    price: 90,
  },
];

export default function Dashboard() {
  return (
    <div className={"flex flex-col gap-8"}>
      <div className="grid grid-cols-12 gap-7">
        <Overview
          label={"Sales Overview"}
          containerProps={{
            className: "col-span-7",
          }}
          data={salesData}
        />
        <Overview
          label={"Inventory Summary"}
          containerProps={{
            className: "col-span-5",
          }}
          statsContainer={{
            className: "flex-col items-center",
          }}
          data={inventoryData}
        />
        <Overview
          label={"Purchase Overview"}
          containerProps={{
            className: "col-span-7",
          }}
          data={purchaseData}
        />
        <Overview
          label={"Product Summary"}
          containerProps={{
            className: "col-span-5",
          }}
          statsContainer={{
            className: "flex-col items-center",
          }}
          data={productData}
        />
      </div>

      <Table
        tableContainer={{ className: "_table-container w-fit" }}
        headerRows={[
          {
            tableCells: [
              {
                children: "Name",
                isHeader: true,
                className: "_table-cell _table-cell_border",
              },
              {
                children: "Sold Quantity",
                isHeader: true,
                className: "_table-cell _table-cell_border",
              },
              {
                children: "Remaining Quantity",
                isHeader: true,
                className: "_table-cell _table-cell_border",
              },
              {
                children: "Price",
                isHeader: true,
                className: "_table-cell _table-cell_border",
              },
            ],
          },
        ]}
        bodyRows={topSellingStock.map((stock) => ({
          tableCells: [
            {
              children: stock.name,
              className: "_table-cell _table-cell__border",
            },
            {
              children: stock.soldQuantity,
              className: "_table-cell _table-cell__border",
            },
            {
              children: stock.remainingQuantity,
              className: "_table-cell _table-cell__border",
            },
            {
              children: stock.price,
              className: "_table-cell _table-cell__border",
            },
          ],
        }))}
        tableCaption={{
          children: "Top Selling Stock",
          className: "_table-caption _table-cell",
        }}
      />
    </div>
  );
}

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-white p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
