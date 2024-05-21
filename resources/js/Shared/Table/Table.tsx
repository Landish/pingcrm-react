import Icon from '../Icon';
import { Link, usePage } from '@inertiajs/react';
import get from 'lodash/get';

interface TableProps<T> {
  columns: {
    name: string;
    label: string;
    colSpan?: number;
    prependCell?: (row: T) => React.ReactNode;
    renderCell?: (row: T) => React.ReactNode;
    appendCell?: (row: T) => React.ReactNode;
  }[];

  rows: T[];

  onRowClickUrl?: (row: T) => string;
}

export default function Table<T>({
  columns = [],
  rows = [],
  onRowClickUrl
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="font-bold text-left">
            {columns?.map(column => (
              <th
                key={column.label}
                colSpan={column.colSpan ?? 1}
                className="px-6 pt-5 pb-4"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Empty state */}
          {rows?.length === 0 && (
            <tr>
              <td
                className="px-6 py-4 border-t text-center"
                colSpan={columns.length}
              >
                No data found.
              </td>
            </tr>
          )}
          {rows?.map((row, index) => {
            return (
              <tr
                key={index}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                {columns.map((column, index) => {
                  return (
                    <td key={column.name} className="border-t">
                      <Link
                        tabIndex={-1}
                        href={onRowClickUrl?.(row)!}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {column.prependCell?.(row)}
                        {column.renderCell?.(row) ??
                          get(row, column.name) ??
                          'N/A'}
                        {column.appendCell?.(row)}
                      </Link>
                    </td>
                  );
                })}
                <td className="w-px border-t">
                  <Link
                    tabIndex={-1}
                    href={onRowClickUrl?.(row)!}
                    className="flex items-center px-4 focus:outline-none"
                  >
                    <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 text-gray-400 fill-current"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}