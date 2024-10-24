import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Table } from "~/components/table";
import { products } from "~/mock";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory | MCV" },
    { name: "description", content: "MCV account: Inventory" },
  ];
};

export default function Inventory() {
  return (
    <div className={"flex flex-col gap-8"}>
      <section className={"table-container bg-white px-4"}>
        <h2 className={"text-heading"}>Overall Inventory</h2>
      </section>
      <Table
        tableContainer={{ className: "table-container bg-white" }}
        tableCaption={{
          children: "Best Selling Product",
        }}
        className={"regular-table"}
        headerRows={[
          {
            className: "text-left",
            tableCells: [
              {
                isHeader: true,
                children: "Product",
              },
              {
                isHeader: true,
                children: "Buying Price",
              },
              {
                isHeader: true,
                children: "Quantity",
              },
              {
                isHeader: true,
                children: "Threshold Value",
              },
              {
                isHeader: true,
                children: "Expiry Date",
              },
              {
                isHeader: true,
                children: "Availability",
              },
            ],
          },
        ]}
        bodyRows={products.map((product) => ({
          tableCells: [
            {
              isHeader: true,
              children: product.name,
            },
            {
              children: `₦${product.price}`,
            },
            {
              children: `${product.qty} Packets`,
            },
            {
              children: `${product.thresholdValue} Packets`,
            },
            {
              children: product.expiryDate,
            },
            {
              children: product.availability,
              className: `${product.availability === "in-stock" ? "text-in-stock" : product.availability === "low-stock" ? "text-out-of-stock" : "text-total-products"}`,
            },
          ],
        }))}
      />
      <Outlet />
    </div>
  );
}
