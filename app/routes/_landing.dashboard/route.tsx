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
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import { ROUTES } from "~/routes";
import { Overview } from "~/routes/_landing.dashboard/overview";
import { Table } from "~/components/table";
import { Product } from "~/routes/_landing.inventories/route";
import { redirectWithErrorToast } from "~/toast";
import {
  transformOrderSummaryData,
  transformSalesAndPurchaseData,
} from "~/utilities/transform";
import { OrderSummaryChart } from "~/routes/_landing.dashboard/order-summary";
import { SalesPurchaseChart } from "~/routes/_landing.dashboard/sale-purchse-chart";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | MCV" },
    { name: "description", content: "MCV account dashboard" },
  ];
};

type Dashboard = {
  id: string;
  createdAt: string;
  updatedAt: string;
  Top_Selling_Stock: Product[];
  Low_Quantity_Stock: Product[];
  Sales_Overview: {
    sales: number;
    cost: number;
    revenue: number;
    profit: number;
  };
  Purchase_Overview: {
    purchase: number;
    cost: number;
    cancel: number;
    return: number;
  };
  Inventory_Summary: { quantity_in_hand: number; to_be_received: number };
  Product_Summary: {
    number_of_suppliers: number;
    number_of_categories: number;
  };
  Sales_and_Purchase: {
    data: {
      month: { amount: number; values: { purchase: number; sales: number } };
    };
  };

  Order_Summary: {
    data: {
      month: { ordered: number; delivered: number };
    };
  };
};

export async function loader({ request }: LoaderFunctionArgs) {
  const token = await getUserToken(request);
  const { data, error } = await fetchClient<
    { [K in keyof Dashboard]: string }[]
  >({
    endpoint: END_POINT.DASHBOARD,
    token: token,
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.DASHBOARD,
      message: error.message,
    });
  }
  const dashboard = data[0];

  const dashboardObj: Dashboard = {
    id: dashboard.id,
    createdAt: dashboard.createdAt,
    updatedAt: dashboard.updatedAt,
    Inventory_Summary: JSON.parse(dashboard.Inventory_Summary),
    Order_Summary: JSON.parse(dashboard.Order_Summary),
    Product_Summary: JSON.parse(dashboard.Product_Summary),
    Purchase_Overview: JSON.parse(dashboard.Purchase_Overview),
    Sales_Overview: JSON.parse(dashboard.Sales_Overview),
    Top_Selling_Stock: JSON.parse(dashboard.Top_Selling_Stock),
    Low_Quantity_Stock: JSON.parse(dashboard.Low_Quantity_Stock),
    Sales_and_Purchase: JSON.parse(dashboard.Sales_and_Purchase),
  };

  return {
    ...dashboardObj,
  };
}

export function clientLoader(args: ClientLoaderFunctionArgs) {
  return cacheClientLoader(args, { key: ROUTES.DASHBOARD });
}

export default function Dashboard() {
  const {
    Top_Selling_Stock,
    Inventory_Summary,
    Product_Summary,
    Sales_and_Purchase,
    Order_Summary,
    Purchase_Overview,
    Sales_Overview,
    Low_Quantity_Stock,
  } = useCachedLoaderData<typeof loader>();

  console.dir(
    { Sales_and_Purchase, Order_Summary },
    { depth: null, colors: true },
  );
  return (
    <div className={"flex flex-col gap-8"}>
      <div className="grid grid-cols-12 gap-7">
        <Overview
          label={"Sales Overview"}
          containerProps={{
            className: "col-span-7",
          }}
          data={[
            {
              amount: `₦ ${Sales_Overview.sales}`,
              label: "Sales",
              Icon: SalesIcon,
            },
            {
              amount: `₦ ${Sales_Overview.revenue}`,
              label: "Revenue",
              Icon: RevenueIcon,
            },
            {
              amount: `₦ ${Sales_Overview.profit}`,
              label: "Profit",
              Icon: ProfitIcon,
            },
            {
              amount: `₦ ${Sales_Overview.cost}`,
              label: "Cost",
              Icon: CostIcon,
            },
          ]}
        />
        <Overview
          label={"Inventory Summary"}
          containerProps={{
            className: "col-span-5",
          }}
          statsContainer={{
            className: "flex-col items-center",
          }}
          data={[
            {
              amount: Inventory_Summary.quantity_in_hand,
              label: "Quantity in Hand",
              Icon: QuantityIcon,
            },
            {
              amount: Inventory_Summary.to_be_received,
              label: "Quantity in Hand",
              Icon: LocationIcon,
            },
          ]}
        />
        <Overview
          label={"Purchase Overview"}
          containerProps={{
            className: "col-span-7",
          }}
          data={[
            {
              amount: `₦ ${Purchase_Overview.purchase}`,
              label: "Purchases",
              Icon: PurchaseIcon,
            },
            {
              amount: `₦ ${Purchase_Overview.cost}`,
              label: "Cost",
              Icon: CostIcon,
            },
            {
              amount: `${Purchase_Overview.cancel}`,
              label: "Cancel",
              Icon: CancelIcon,
            },
            {
              amount: `₦ ${Purchase_Overview.return}`,
              label: "Return",
              Icon: CostIcon,
            },
          ]}
        />
        <Overview
          label={"Product Summary"}
          containerProps={{
            className: "col-span-5",
          }}
          statsContainer={{
            className: "flex-col items-center",
          }}
          data={[
            {
              amount: Product_Summary.number_of_suppliers,
              label: "Number of Suppliers",
              Icon: UserIcon,
            },
            {
              amount: Product_Summary.number_of_categories,
              label: "Number of Categories",
              Icon: CategoriesIcon,
            },
          ]}
        />
      </div>

      <div className={"grid grid-cols-12 gap-7"}>
        <SalesPurchaseChart
          containerProps={{
            className: "col-span-7 h-96 row-span-",
          }}
          data={transformSalesAndPurchaseData(Sales_and_Purchase.data)}
        />
        <OrderSummaryChart
          containerProps={{
            className: "col-span-5 h-96 row-span-",
          }}
          data={transformOrderSummaryData(Order_Summary.data)}
        />
      </div>

      <div>
        <Table
          className={"w-full table-fixed"}
          tableContainer={{ className: "_table-container col-span-7" }}
          headerRows={[
            {
              tableCells: [
                {
                  children: "Name",
                  isHeader: true,
                  className: "_table-cell _table-cell__border",
                },
                {
                  children: "Sold Quantity",
                  isHeader: true,
                  className: "_table-cell _table-cell__border",
                },
                {
                  children: "Remaining Quantity",
                  isHeader: true,
                  className: "_table-cell _table-cell__border",
                },
                {
                  children: "Price",
                  isHeader: true,
                  className: "_table-cell _table-cell__border",
                },
              ],
            },
          ]}
          bodyRows={Top_Selling_Stock.map((stock) => ({
            tableCells: [
              {
                children: stock.Product_name,
                className: "_table-cell _table-cell__border",
              },
              {
                children: stock.Quantity,
                className: "_table-cell _table-cell__border",
              },
              {
                children: stock.Quantity,
                className: "_table-cell _table-cell__border",
              },
              {
                children: stock.Buying_Price,
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
    </div>
  );
}

export function LowQualityStock({ products }: { products: Product[] }) {
  return (
    <>
      <Container>
        <h2>Low Quality Stock</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <img src={product.Image} alt={product.Product_name} />
              <div>
                <h3>Tata Salt</h3>
                Remaining Quantity: {product.Quantity} Packet
              </div>
              <span>Low</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
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
