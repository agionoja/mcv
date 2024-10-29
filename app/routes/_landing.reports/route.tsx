import type { MetaFunction } from "@remix-run/node";
import TableWithPagination, {
  INDICATION,
} from "~/components/table-with-pagination";
import { bestSellingProducts } from "~/mock";

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
        tHeadCellData={[
          "Product",
          "Product ID",
          "Category",
          "Remaining Quantity",
          "Turn Over",
          "Increased By",
        ]}
        tableBodyData={bestSellingProducts.map((product) => ({
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
