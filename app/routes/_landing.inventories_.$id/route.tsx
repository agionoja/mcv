import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import fetchClient, { END_POINT } from "~/fetch-client";
import { Product } from "~/routes/_landing.inventories/route";
import { useLoaderData } from "@remix-run/react";
import { PRODUCT } from "~/routes/_landing.inventories.new-inventory/route";
import { Table } from "~/components/table";
import { toast } from "react-toastify";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory | MCV" },
    { name: "description", content: "Moscord Cosmetic Venture Inventory" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { error, data: product } = await fetchClient<Product>({
    endpoint: END_POINT.PRODUCT_WITH_ID.replace(
      ":id",
      String(params.id),
    ) as END_POINT,
  });
  if (product) product.Expiry_Date = new Date(product.Expiry_Date);

  return {
    error,
    product,
  };
}

export default function Inventory() {
  const { product, error } = useLoaderData<typeof loader>();

  if (error) return toast(error?.message, { type: "error" });

  console.log(product);
  return (
    <>
      <div className={"h-full rounded-lg bg-white px-4 pb-3.5 pt-5"}>
        <h2 className={"capitalize"}>{product?.Product_name}</h2>

        <div>
          <Table
            tableCaption={{ children: "Primary Details" }}
            className={"table-fixed"}
            bodyRows={[
              {
                tableCells: [
                  {
                    children: "Product name",
                    isHeader: true,
                  },
                  {
                    children: product?.Product_name,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
