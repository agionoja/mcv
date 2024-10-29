import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { v4 } from "uuid";

type TableCellProps = { isHeader?: true } & (
  | ThHTMLAttributes<HTMLTableCellElement>
  | TdHTMLAttributes<HTMLTableCellElement>
);

interface TableRowProps
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  tableCells: TableCellProps[];
}

type TableCaptionProps = {
  tableCaption?: HTMLAttributes<HTMLTableCaptionElement>;
};

type TableHeaderProps = {
  headerRows: TableRowProps[];
  tableHeader?: Omit<HTMLAttributes<HTMLTableSectionElement>, "children">;
};

type TableBodyProps = {
  bodyRows: TableRowProps[];
  tableBody?: Omit<HTMLAttributes<HTMLTableSectionElement>, "children">;
};

type TableFooterProps = {
  footerRows?: TableRowProps[];
  tableFooter?: Omit<HTMLAttributes<HTMLTableSectionElement>, "children">;
};

type TableContainerProps = {
  tableContainer?: HTMLAttributes<HTMLDivElement>;
};

export type TableProps = Omit<HTMLAttributes<HTMLTableElement>, "children"> &
  TableBodyProps &
  TableFooterProps &
  TableHeaderProps &
  TableCaptionProps &
  TableContainerProps;

export function Table({
  bodyRows,
  footerRows,
  headerRows,
  tableCaption,
  tableHeader,
  tableBody,
  tableFooter,
  tableContainer,
  ...props
}: TableProps) {
  return (
    <div {...tableContainer} className={`${tableContainer?.className}`}>
      <table className={`${props.className}`} {...props}>
        <TableCaption tableCaption={tableCaption} />
        <TableHeader headerRows={headerRows} {...tableHeader} />
        <TableBody bodyRows={bodyRows} {...tableBody} />
        <TableFooter footerRows={footerRows} {...tableFooter} />
      </table>
    </div>
  );
}

function TableBody({ bodyRows, ...props }: TableBodyProps) {
  return (
    <tbody {...props}>
      <TableRows tableRows={bodyRows} />
    </tbody>
  );
}

function TableFooter({ footerRows, ...props }: TableFooterProps) {
  return footerRows ? (
    <tfoot {...props}>
      <TableRows tableRows={footerRows} />
    </tfoot>
  ) : null;
}

function TableHeader({ headerRows, ...props }: TableHeaderProps) {
  return (
    <thead {...props}>
      <TableRows tableRows={headerRows} />
    </thead>
  );
}

function TableCaption({ tableCaption }: TableCaptionProps) {
  return tableCaption ? (
    <caption {...tableCaption}>{tableCaption.children}</caption>
  ) : null;
}

function TableCell({ children, isHeader, ...props }: TableCellProps) {
  if (isHeader) {
    return <th {...props}>{children}</th>;
  }
  return <td {...props}>{children}</td>;
}

function TableRow({ tableCells, ...props }: TableRowProps) {
  return (
    <tr {...props}>
      {tableCells.map((tableCell) => (
        <TableCell key={v4()} {...tableCell} />
      ))}
    </tr>
  );
}

function TableRows({ tableRows }: { tableRows: TableRowProps[] }) {
  return tableRows.map((tableRow) => <TableRow key={v4()} {...tableRow} />);
}
