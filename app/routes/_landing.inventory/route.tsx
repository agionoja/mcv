import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Table } from "~/components/table";
import { ORDER_STATUS, orders, products } from "~/mock";
import GeneralTable, { INDICATION } from "~/components/general-table";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory | MCV" },
    { name: "description", content: "MCV account: Inventory" },
  ];
};

export const loader: LoaderFunction = async function () {
  return json(null, {
    headers: {
      "Cache-Control": `max-age=${60 * 60}`,
    },
  });
};

export default function Inventory() {
  return (
    <div className={"flex flex-col gap-8"}>
      <section className={"table-container bg-white px-4"}>
        <h2 className={"text-heading"}>Overall Inventory</h2>
      </section>
      <GeneralTable
        tableCaption={"Products"}
        tHeadCellData={[
          "Products",
          "Buying Price",
          "Quantity",
          "Threshold Value",
          "Expiry Date",
          "Availability",
        ]}
        tableBodyData={products.map((product) => ({
          cells: [
            { data: product.name, isHeader: true },
            { data: `${product.price}`, isHeader: undefined },
            { data: `${product.qty}` },
            { data: `${product.thresholdValue}` },
            { data: product.expiryDate },
            {
              data: product.availability,
              indication:
                product.availability === "in-stock"
                  ? INDICATION.OK
                  : product.availability === "low-stock"
                    ? INDICATION.NEUTRAL
                    : INDICATION.ERROR,
            },
          ],
        }))}
      />
      <Outlet />
    </div>
  );
}
