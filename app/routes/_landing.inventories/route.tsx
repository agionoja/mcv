import { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Outlet } from "@remix-run/react";
import TableWithPagination, {
  INDICATION,
} from "~/components/table-with-pagination";
import { ROUTES } from "~/routes";
import fetchClient, { END_POINT } from "~/fetch-client";
import { formatDate } from "~/utilities/formatDate";
import { Spinner } from "~/components/loading-indicators";
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import { redirectWithErrorToast } from "~/toast";

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
  const { data: products, error } = await fetchClient<Product[]>({
    endpoint: END_POINT.PRODUCT_FIND_ALL,
  });

  if (error)
    return redirectWithErrorToast({
      redirectTo: "/inventories",
      message: error.message,
    });

  return {
    products: products || [],
  };
}

export const clientLoader = (args: ClientLoaderFunctionArgs) =>
  cacheClientLoader(args, { key: ROUTES.NEW_INVENTORY });

clientLoader.hydrate = true;

export function HydrateFallback() {
  return <Spinner borderColor={"rgba(21,112,239,0.2)"} borderWidth={4} />;
}

export default function Inventories() {
  const { products } = useCachedLoaderData<typeof loader>();

  return (
    <div className={"flex flex-col gap-8"}>
      <Outlet />
      <section className={"table-container bg-white px-4"}>
        <h2 className={"text-heading"}>Overall Inventory</h2>
      </section>

      {products?.length ? (
        <TableWithPagination
          tableControl={{
            add: { label: "Add Product", route: "/inventories/new-inventory" },
          }}
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
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}
