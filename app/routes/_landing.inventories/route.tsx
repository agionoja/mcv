import { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { products } from "~/mock";
import TableWithPagination, {
  INDICATION,
} from "~/components/table-with-pagination";
import { ROUTES } from "~/routes";
import fetchClient, { END_POINT } from "~/fetch-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventories | MCV" },
    { name: "description", content: "All Moscord Cosmetic Venture Supplier" },
  ];
};

export async function loader() {
  const products = fetchClient({
    endpoint: END_POINT.PRODUCT_FIND_ALL,
    init: {
      method: "GET",
    },
  });

  return {
    products,
  };
}

export default function Inventories() {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData);

  return (
    <div className={"flex flex-col gap-8"}>
      <section className={"table-container bg-white px-4"}>
        <h2 className={"text-heading"}>Overall Inventory</h2>
      </section>
      <Outlet />
      <TableWithPagination
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
          rowUrl: ROUTES.INVENTORY.replace(":id", product.name),
          rowCells: [
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
    </div>
  );
}
