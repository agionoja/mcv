import { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Outlet } from "@remix-run/react";
import TableWithPagination from "~/components/table-with-pagination";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast } from "~/toast";
import { ROUTES } from "~/routes";
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import { Supplier } from "~/routes/_landing.suppliers.new-supplier/route";

export const meta: MetaFunction = () => {
  return [
    { title: "Suppliers | MCV" },
    {
      name: "description",
      content: "Moscord Cosmetic Venture Suppliers",
    },
  ];
};

export async function loader() {
  const { data: suppliers, error } = await fetchClient<Supplier[]>({
    endpoint: END_POINT.SUPPLIER_All,
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.SUPPLIERS,
      message: error.message,
    });
  }

  return { suppliers };
}
export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return cacheClientLoader(args, { key: ROUTES.SUPPLIERS });
}

export default function Suppliers() {
  const { suppliers } = useCachedLoaderData<typeof loader>();
  return (
    <>
      <Outlet />
      {suppliers ? (
        <TableWithPagination
          tableControl={{
            add: {
              label: "Add Supplier",
              route: "/suppliers/new-supplier",
            },
          }}
          tHeadCellData={["Supplier Name", "Contact", "email"]}
          tableBodyData={suppliers.map((supplier) => ({
            rowUrl: supplier.id,
            rowCells: [
              { isHeader: true, data: supplier.Supplier_name },
              // { data: supplier.product },
              { data: supplier.Contact_Number },
              { data: "no email from implementation yet" },
            ],
          }))}
          tableCaption={"Suppliers"}
        />
      ) : (
        <p>No Suppliers</p>
      )}
    </>
  );
}
