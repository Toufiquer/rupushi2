/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2025
|-----------------------------------------
*/

'use client';

import { useState } from 'react';
import Pagination from '@/app/dashboard/orders/components/Pagination';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGetOrdersQuery } from '@/redux/features/orders/ordersApi';
import OrderTable from './components/OrderTable';
const Page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { data: getResponseData, isLoading, error } = useGetOrdersQuery({ page, limit });
  const { data: getResponseDataPagination } = useGetOrdersQuery({ page: 1, limit: 1 });
  if (error) {
    return <div>Please try again.</div>;
  }
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="w-full max-w-7xl">
        <div className="w-full text-sm py-4">
          Total Orders: {getResponseDataPagination?.data?.total}
        </div>
        <OrderTable data={getResponseData} isLoading={isLoading} />
        <Pagination
          currentPage={page}
          itemsPerPage={limit}
          onPageChange={setPage}
          totalItems={getResponseDataPagination?.data?.total || 10}
        />{' '}
        <div className="max-w-[380px] flex items-center justify-between pl-2 gap-4 rounded-xl w-full mx-auto mt-8">
          <Label htmlFor="set-limit" className="pl-2 w-full">
            <p className="text-right text-slate-600 font-normal ">Order per page</p>
          </Label>
          <Select
            onValueChange={value => {
              setLimit(Number(value));
              setPage(1);
            }}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="col-span-4">
              <SelectValue placeholder="Select a limit" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50">
              {[2, 5, 10, 25, 50, 100].map(i => (
                <SelectItem
                  key={i}
                  value={i.toString()}
                  className="cursor-pointer hover:bg-slate-200 bg-slate-50"
                >
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
export default Page;
