/*
|-----------------------------------------
| setting up data table | Main table for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: DaaUK, September, 2023
|-----------------------------------------
*/

'use client';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnSort,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState('');
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div>
      <div className="py-4 flex w-full items-center justify-between">
        <Input
          placeholder="Filter..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm bg-slate-200"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-slate-200">
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize bg-slate-200 -m-1 cursor-pointer hover:bg-slate-300"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mb-8 rounded-md border pt-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                className="bg-slate-600 hover:bg-slate-700 text-slate-200"
                key={headerGroup.id}
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" font-bold text-slate-200"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'asc'
                          ? '↑'
                          : '↓'
                        : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  className=" hover:bg-slate-100"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mb-8 mt-4 flex flex-col md:flex-row gap-2 items-center justify-between">
        <p>
          <strong>
            Page No: {table.getState().pagination.pageIndex + 1} out of {table.getPageCount()}
          </strong>
        </p>
        <div className="flex items-center justify-end gap-2">
          <Button
            className="bg-slate-600 hover:bg-slate-800 hover:text-white text-slate-200 "
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <AiOutlineDoubleLeft />
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-800 hover:text-white text-slate-200 "
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <AiOutlineLeft />
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-800 hover:text-white text-slate-200 "
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <AiOutlineRight />
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-800 hover:text-white text-slate-200 "
            variant="outline"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <AiOutlineDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
