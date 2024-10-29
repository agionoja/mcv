import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import TableWithPagination from "~/components/table-with-pagination";
import { suppliers } from "~/mock";

export const meta: MetaFunction = () => {
  return [
    { title: "Suppliers | MCV" },
    {
      name: "description",
      content: "Moscord Cosmetic Venture Suppliers",
    },
  ];
};

export default function Suppliers() {
  return (
    <>
      <TableWithPagination
        tHeadCellData={["Supplier Name", "Product", "Contact", "email"]}
        tableBodyData={suppliers.map((supplier) => ({
          rowUrl: supplier.contact,
          rowCells: [
            { isHeader: true, data: supplier.name },
            { data: supplier.product },
            { data: supplier.contact },
            { data: supplier.email },
          ],
        }))}
        tableCaption={"Suppliers"}
        // tableContainer={{ className: "pb-12" }}
      />
      <Outlet />
    </>
  );
}
