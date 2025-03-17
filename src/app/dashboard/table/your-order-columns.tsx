/*
|-----------------------------------------
| setting up wishlist-columns for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: DaaUK, September, 2023
|-----------------------------------------
*/
import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { StatusBox } from './status-box';
import { yourOrdersType } from './your-order-type';
import { FaRegEdit } from 'react-icons/fa';

export const columns: ColumnDef<yourOrdersType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'productUrl',
    header: 'Image',
    cell: info => (
      <Image
        className="h-[80px] min-h-[80px] w-[80px] min-w-[80px] object-cover"
        width={100}
        height={20}
        src={info.getValue() as string}
        alt="product picture"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Products',
    cell: info => {
      const name = (info.getValue() as string) || '';
      return (
        <Link
          className="inline-block min-w-[220px] font-semibold hover:underline"
          href={info.row.original.productUrl}
          title={name}
        >
          {name.length > 40 ? `${name.slice(0, 40)}...` : (name as string)}
          <span className="block text-xs font-normal text-slate-600">500g</span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'orderId',
    header: 'Order',
    cell: info => (
      <span className="block text-sm font-semibold text-slate-600">
        #{info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: info => (
      <span className=" inline-block min-w-[100px] items-center"> {info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Items',
    cell: info => <span className=" items-center"> {info.getValue() as string}</span>,
  },
  {
    accessorKey: 'price',
    header: 'Amount',
    cell: info => (
      <span className="flex min-w-[80px] items-center">&#163; {info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: info => (
      <span className="flex items-center gap-3">
        <span className="cursor-pointer">
          <StatusBox className="text-[12px]" text={(info.getValue() as string) || 'not found'} />
        </span>
      </span>
    ),
  },
  {
    accessorKey: 'edit',
    header: 'Edit',
    cell: () => (
      <span className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="cursor-pointer">
                <FaRegEdit />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    ),
  },
];
