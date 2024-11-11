import type { MetaFunction } from "@remix-run/node";
import TableWithPagination, {
  INDICATION,
} from "~/components/table-with-pagination";
import { bestSellingProducts } from "~/mock";
import { ROUTES } from "~/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "Reports | MCV" },
    { name: "description", content: "MCV account reports" },
  ];
};

export default function Reports() {
  return (
    <>
      <TableWithPagination
        tableControl={{
          add: {
            label: "Add Supplier",
            route: "/orders/new-order",
          },
        }}
        tHeadCellData={[
          "Product",
          "Product ID",
          "Category",
          "Remaining Quantity",
          "Turn Over",
          "Increased By",
        ]}
        tableBodyData={bestSellingProducts.map((product) => ({
          rowUrl: ROUTES.INVENTORY.replace(":id", product.productId.toString()),
          rowCells: [
            { isHeader: true, data: product.product },
            { data: product.productId.toString() },
            { data: product.category },
            { data: product.remainingQuantity },
            { data: product.turnover },
            { data: product.increaseBy, indication: INDICATION.OK },
          ],
        }))}
        tableCaption={"Best selling products"}
      />
    </>
  );
}
