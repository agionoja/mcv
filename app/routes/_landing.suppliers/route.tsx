import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import GeneralTable from "~/components/general-table";
import { suppliers } from "~/mock";

export const meta: MetaFunction = () => {
  return [
    { title: "Suppliers | MCV" },
    { name: "description", content: "MCV account suppliers" },
  ];
};

export default function Suppliers() {
  return (
    <>
      <GeneralTable
        tHeadCellData={["Supplier Name", "Product", "Contact", "email"]}
        tableBodyData={suppliers.map((supplier, index) => ({
          cells: [
            { isHeader: true, data: supplier.name },
            { data: supplier.product },
            { data: supplier.contact },
            { data: supplier.email },
          ],
        }))}
        tableCaption={"Suppliers"}
      />
      <Outlet />
    </>
  );
}
