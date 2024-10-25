import { Table } from "~/components/table";

type Row = {
  cells: { isHeader?: true; data: string; indication?: INDICATION }[];
};
export enum INDICATION {
  ERROR = "error",
  NEUTRAL = "neutral",
  OK = "ok",
  WARNING = "warning",
  NULL = "null",
}

type GeneralTableProps = {
  tHeadCellData: string[];
  tableBodyData: Row[];
  tableFooterData?: Row[];
  tableCaption: string;
};

export default function GeneralTable({
  tHeadCellData,
  tableFooterData,
  tableCaption,
  tableBodyData,
}: GeneralTableProps) {
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
  const cellStyles = "px-4 py-3.5 text-left";
  const cellBorder = "border-b border-border-color";

  return (
    <Table
      className={"w-full table-fixed"}
      tableContainer={{ className: "rounded-lg pb-3.5 pt-5 bg-white" }}
      tableCaption={{
        className: "text-left text-lg font-medium text-heading",
        children: tableCaption,
      }}
      headerRows={[
        {
          tableCells: tHeadCellData.map((th) => ({
            isHeader: true,
            children: th,
            className: cellStyles + " " + cellBorder,
          })),
        },
      ]}
      bodyRows={tableBodyData.map(({ cells }, rowIndex) => ({
        tableCells: cells.map(({ isHeader = undefined, data, indication }) => ({
          isHeader: isHeader,
          children: data,
          // Only add the border if the current row is NOT the last row
          className: `${cellStyles} ${indicationStyles(indication)} ${
            rowIndex < tableBodyData.length - 1 ? cellBorder : ""
          }`,
        })),
      }))}
      footerRows={
        tableFooterData
          ? tableFooterData.map(({ cells }, rowIndex) => ({
              tableCells: cells.map(({ isHeader, data, indication }) => ({
                isHeader: isHeader,
                children: data,
                // Only add the border if the current row is NOT the last row
                className: `${cellStyles} ${indicationStyles(indication)} ${
                  rowIndex < tableFooterData.length - 1 ? cellBorder : ""
                }`,
              })),
            }))
          : undefined
      }
    />
  );
}
