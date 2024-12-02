import { Column } from "./index.types";

interface TableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto  cursor-pointer">
      <table className="min-w-full bg-transparent border border-gray-300 ">
        <thead>
          <tr className=" ">
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b border-r bg-gray-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-800">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="py-4 px-6 border-b text-start border-l"
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
