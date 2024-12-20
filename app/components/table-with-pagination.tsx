import { Table, TableProps } from "~/components/table";
import { Link, useNavigate } from "@remix-run/react";
import { ROUTES } from "~/routes";

type Row = {
  rowUrl: string;
  rowCells: {
    isHeader?: true;
    data: string;
    indication?: INDICATION;
  }[];
};

export enum INDICATION {
  ERROR = "error",
  NEUTRAL = "neutral",
  OK = "ok",
  WARNING = "warning",
  NULL = "null",
}

type TableControl = {
  add: {
    route: `${ROUTES}`;
    label: string;
  };
};

type GeneralTableProps = {
  tHeadCellData: string[];
  tableBodyData: Row[];
  tableFooterData?: Row[];
  tableCaption?: string;
  tableControl: TableControl;
} & Pick<TableProps, "tableContainer">;

export default function TableWithPagination({
  tHeadCellData,
  tableFooterData,
  tableCaption,
  tableBodyData,
  tableContainer,
  tableControl,
}: GeneralTableProps) {
  const navigate = useNavigate();
  const indicationStyles = (indication?: INDICATION) =>
    `${
      indication === INDICATION.OK
        ? "text-ok-clr"
        : indication === INDICATION.ERROR
          ? "text-warning-clr"
          : indication === INDICATION.NEUTRAL
            ? "text-neutral-clr"
            : ""
    }`;

  return (
    <Table
      className={"w-full table-fixed"}
      tableContainer={{
        ...tableContainer,
        className: `_table-container ${tableContainer?.className}`,
        children: (
          <>
            <div className={"absolute right-4 top-10"}>
              <Link
                to={tableControl.add.route}
                className={"btn bg-primary-cta text-white"}
              >
                {tableControl.add.label}
              </Link>
            </div>
          </>
        ),
      }}
      tableCaption={{
        className: `_table-caption _table-cell`,
        children: tableCaption,
      }}
      headerRows={[
        {
          // className: "min-w-96",
          tableCells: tHeadCellData.map((th) => ({
            isHeader: true,
            children: th,
            className: "_table-cell _table-cell__border",
          })),
        },
      ]}
      bodyRows={tableBodyData.map(({ rowCells, rowUrl }, rowIndex) => ({
        onClick: () => navigate(rowUrl),
        className: "cursor-pointer",
        tableCells: rowCells.map(
          ({ isHeader = undefined, data, indication }) => ({
            isHeader: isHeader,
            children: data,
            // Only add the border if the current row is NOT the last row
            className: `_table-cell ${indicationStyles(indication)} ${
              rowIndex < tableBodyData.length - 1 ? "_table-cell__border" : ""
            }`,
          }),
        ),
      }))}
      footerRows={
        tableFooterData
          ? tableFooterData.map(({ rowCells }, rowIndex) => ({
              tableCells: rowCells.map(({ isHeader, data, indication }) => ({
                isHeader: isHeader,
                children: data,
                // Only add the border if the current row is NOT the last row
                className: `_table-cell ${indicationStyles(indication)} ${
                  rowIndex < tableFooterData.length - 1
                    ? "_table-cell__border"
                    : ""
                }`,
              })),
            }))
          : undefined
      }
    />
  );
}
