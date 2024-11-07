import { data, HeadersFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import TableWithPagination, {
  INDICATION,
} from "~/components/table-with-pagination";
import { ROUTES } from "~/routes";
import fetchClient, { END_POINT } from "~/fetch-client";
import { formatDate } from "~/utilities/formatDate";
import { toast } from "react-toastify";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "",
});

export type Product = {
  id: string;
  Product_name: string;
  Category: string;
  Buying_Price: number;
  Quantity: number;
  Unit: number;
  Expiry_Date: Date;
  Threshold_Value: number;
  Image: string;
  Availability: "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  createdAt: string;
  updatedAt: string;
};
export const meta: MetaFunction = () => {
  return [
    { title: "Inventories | MCV" },
    { name: "description", content: "All Moscord Cosmetic Venture Supplier" },
  ];
};

export async function loader() {
  const { error, data: products } = await fetchClient<Product[]>({
    endpoint: END_POINT.PRODUCT_FIND_ALL,
    init: {
      method: "GET",
    },
  });

  return data(
    { products, error },
    {
      headers: {
        "Cache-Control": "max-age=60",
      },
    },
  );
}

export default function Inventories() {
  const { products, error } = useLoaderData<typeof loader>();

  if (!products) {
    toast(error?.message, { type: "error" });
    return;
  }

  return (
    <div className={"flex flex-col gap-8"}>
      <Outlet />
      <section className={"table-container bg-white px-4"}>
        <h2 className={"text-heading"}>Overall Inventory</h2>
      </section>
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
        tableBodyData={products?.map((product) => ({
          rowUrl: ROUTES.INVENTORY.replace(":id", product.id),
          rowCells: [
            { data: product.Product_name, isHeader: true },
            { data: `₦${product.Buying_Price}` },
            { data: `${product.Quantity}` },
            { data: `${product.Threshold_Value}` },
            { data: formatDate(new Date(product["Expiry_Date"])) },
            {
              data:
                product.Availability === "IN_STOCK"
                  ? "In-stock"
                  : product.Availability === "OUT_OF_STOCK"
                    ? "Out of stock"
                    : product.Availability === "LOW_STOCK"
                      ? "Low stock"
                      : "",
              indication:
                product.Availability === "IN_STOCK"
                  ? INDICATION.OK
                  : product.Availability === "LOW_STOCK"
                    ? INDICATION.NEUTRAL
                    : INDICATION.ERROR,
            },
          ],
        }))}
      />
    </div>
  );
}
