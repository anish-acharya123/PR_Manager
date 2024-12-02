import {
  TableBody,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "../../UI/TableComponent";
import { Column } from "./index.types";

interface TableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
}

const TableComponent = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <Table  className="min-w-full bg-transparent border border-gray-300 ">
      <TableHeader >
        <TableRow  className=" ">
          {columns.map((col, index) => (
            <TableHead
              key={index}
              className="py-2 px-4 border-b border-r bg-gray-600"
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-gray-800">
            {columns.map((col, colIndex) => (
              <TableCell
                key={colIndex}
                className="py-4 px-6 border-b text-start border-l"
              >
                {col.render
                  ? col.render(row[col.accessor], row)
                  : (row[col.accessor] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
