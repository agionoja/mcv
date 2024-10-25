import { Table } from "~/components/table";

type GeneralTableProps = {
  tHeadCellData: string[];
  tableBodyData: { cellData: { isHeader?: boolean; data: string }[] };
  tableFooterData?: string[];
};

export default function GeneralTable({
  tHeadCellData,
  tableFooterData,
  tableBodyData,
}: GeneralTableProps) {
  const cellStyle = "px-4 py-3.5 text-left";
  return (
    <Table
      className={"w-full table-fixed bg-white"}
      tableContainer={{ className: "rounded-lg pb-3.5 pt-5" }}
      tableCaption={{
        className: "mb-4 text-left text-lg font-medium text-heading",
      }}
      headerRows={[
        {
          tableCells: tHeadCellData.map((th) => ({
            isHeader: true,
            children: th,
            className: cellStyle,
          })),
        },
      ]}
      bodyRows={[]}
      footerRows={[]}
    />
  );
}
