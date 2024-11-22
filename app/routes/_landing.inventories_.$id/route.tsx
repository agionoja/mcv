import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import fetchClient, { END_POINT } from "~/fetch-client";
import { Product } from "~/routes/_landing.inventories/route";
import { useLoaderData } from "@remix-run/react";
import { Table } from "~/components/table";
import { toast } from "react-toastify";
import { formatDate } from "~/utilities/formatDate";

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

  return (
    <div className="flex h-full flex-col gap-5 rounded-lg bg-white p-6">
      {/* Product Title */}
      <h2 className="text-2xl font-bold capitalize">{product?.Product_name}</h2>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 gap-12 text-xl">
        {/* Left Section */}
        <div className="col-span-7 space-y-12">
          {/* Primary Details */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Primary Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Product Name</span>
                <span className="font-bold">{product?.Product_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Product Category</span>
                <span className="font-bold">{product?.Category}</span>
              </div>
              <div className="flex justify-between">
                <span>Expiry Date</span>
                <span className="font-bold">
                  {formatDate(new Date(product?.Expiry_Date || Date.now()))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Threshold Value</span>
                <span className="font-bold">{product?.Threshold_Value}</span>
              </div>
            </div>
          </div>

          {/* Supplier Details */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Supplier Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Supplier Name</span>
                <span className="font-bold">{product?.Product_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Number</span>
                <span className="font-bold">{"08056788"}</span>
              </div>
            </div>
          </div>

          {/* Stock Locations Table */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Stock Locations</h3>
            <Table
              className="w-full table-fixed"
              tableContainer={{ className: "overflow-x-auto" }}
              tableHeader={{
                className: "bg-border-color",
              }}
              headerRows={[
                {
                  tableCells: [
                    {
                      children: "Store Name",
                      isHeader: true,
                      className: "p-2 text-left font-semibold",
                    },
                    {
                      children: "Stock in hand",
                      isHeader: true,
                      className: "p-2 text-right font-semibold",
                    },
                  ],
                },
              ]}
              bodyRows={[
                {
                  tableCells: [
                    {
                      children: "Old Airport Branch",
                      className: "p-2 text-left",
                    },
                    {
                      children: "12",
                      className: "p-2 text-right text-primary-cta",
                    },
                  ],
                },
                {
                  tableCells: [
                    {
                      children: "Terminus Branch",
                      className: "p-2 text-left",
                    },
                    {
                      children: "20",
                      className: "p-2 text-right text-primary-cta",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-5 flex flex-col items-center gap-12 px-8 text-xl">
          <img
            src={product?.Image}
            alt={product?.Product_name}
            className="h-48 w-48 border-2 border-dotted border-gray-300 p-2"
          />

          <div className="w-full space-y-4">
            <div className="flex justify-between">
              <span>Opening Sock</span>
              <span className="font-bold">{500}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining Stock</span>
              <span className="font-bold">{200}</span>
            </div>{" "}
            <div className="flex justify-between">
              <span>On the eay</span>
              <span className="font-bold">{15}</span>
            </div>{" "}
            <div className="flex justify-between">
              <span>Threshold Value</span>
              <span className="font-bold">{product?.Threshold_Value}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
