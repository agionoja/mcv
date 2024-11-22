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
      redirectTo: ROUTES.USERS,
      message: error.message,
    });
  }

  return { suppliers };
}
export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return cacheClientLoader(args, { key: ROUTES.USERS });
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
              label: "Add User",
              route: ROUTES.ADD_USER,
            },
          }}
          tHeadCellData={["User Name", "email"]}
          tableBodyData={suppliers.map((supplier) => ({
            rowUrl: supplier.id,
            rowCells: [
              { isHeader: true, data: supplier.Supplier_name },
              // { data: supplier.product },
              { data: "no email from implementation yet" },
            ],
          }))}
          tableCaption={"Users"}
        />
      ) : (
        <p>No Suppliers</p>
      )}
    </>
  );
}
