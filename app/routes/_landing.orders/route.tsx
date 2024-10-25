import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import GeneralTable, { INDICATION } from "~/components/general-table";
import { ORDER_STATUS, orders } from "~/mock";

export const meta: MetaFunction = () => {
  return [
    { title: "Orders | MCV" },
    { name: "description", content: "MCV account: Orders" },
  ];
};

export default function Orders() {
  return (
    <>
      <GeneralTable
        tableCaption={"Orders"}
        tHeadCellData={[
          "Products",
          "Order Value",
          "Quantity",
          "Order ID",
          "Expected",
          "Status",
        ]}
        tableBodyData={orders.map((order) => ({
          cells: [
            { data: order.name },
            { data: `${order.orderValue}` },
            { data: order.quantity },
            { data: `${order.orderId}` },
            { data: order.expectedDelivery },
            {
              data: order.status,
              indication:
                order.status === ORDER_STATUS.DELAYED
                  ? INDICATION.ERROR
                  : order.status === ORDER_STATUS.OUT_FOR_DELIVERY
                    ? INDICATION.OK
                    : INDICATION.NEUTRAL,
            },
          ],
        }))}
      />
      <Outlet />
    </>
  );
}
