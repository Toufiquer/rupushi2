import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import OrderDetailsPage from './SingleOrderView';
import Link from 'next/link';

// Types from the prompt
export interface CustomerInfo {
  customerName: string;
  address: string;
  phone: string;
  note: string;
}

export interface ProductInfo {
  name: string;
  'product-code': string;
  img: string;
  realPrice: number;
  discountedPrice: number;
  offer: string;
  stock: number;
  'description-top': string;
  'description-bottom': string;
  material: string;
  design: string;
  color: string;
  category: string;
  weight: string;
  'chain length': string;
  style: string;
  quantity: number;
}

export interface OrderItem {
  customerInfo: CustomerInfo;
  _id: string;
  orderId: number;
  totalProduct: number;
  deliveryCharge: number;
  orderStatus: string;
  totalPrice: number;
  shippingArea: string;
  productInfo: ProductInfo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ApiResponse {
  data: {
    _2_template_: OrderItem[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  status: number;
}
export const apiResponseData: ApiResponse = {
  data: {
    _2_template_: [],
    total: 0,
    page: 1,
    limit: 10,
  },
  message: '',
  status: 0,
};

type OrderTableProps = {
  data: ApiResponse;
  isLoading?: boolean;
  error?: string | null;
};

type SortDirection = 'asc' | 'desc';
type SortField =
  | 'orderId'
  | 'customerName'
  | 'orderStatus'
  | 'totalPrice'
  | 'createdAt'
  | 'totalProduct';

const OrderTable: React.FC<OrderTableProps> = ({ data, isLoading = false, error = null }) => {
  // State for expanded rows
  // State for sorting
  const [sortField, setSortField] = useState<SortField>('orderId');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  // State for filtering
  const [statusFilter, setStatusFilter] = useState<string>('all');
  // State for search
  const [searchTerm, setSearchTerm] = useState<string>('');
  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = data?.data?.limit || 10;
  const [viewId, setViewId] = useState('');

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sorted and filtered data
  const getSortedFilteredData = () => {
    if (!data?.data?._2_template_) return [];

    let filteredData = [...data.data._2_template_];

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredData = filteredData.filter(
        item => item.orderStatus.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        item =>
          item.orderId.toString().includes(searchLower) ||
          item.customerInfo.customerName.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'customerName':
          aValue = a.customerInfo.customerName;
          bValue = b.customerInfo.customerName;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filteredData;
  };

  // Pagination logic
  const filteredData = getSortedFilteredData();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-500"
        />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-red-100 text-red-700 rounded-md"
      >
        <span>Error: {error}</span>
      </motion.div>
    );
  }

  // Render empty state
  if (!data || !data.data || !data.data._2_template_ || data.data._2_template_.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 text-center text-gray-500"
      >
        <span>No orders found.</span>
      </motion.div>
    );
  }

  // Generate status options based on available data
  const statusOptions = Array.from(new Set(data.data._2_template_.map(item => item.orderStatus)));
  const handleUpdateView = (id: string, isUpdate: string) => {
    console.log(' id : ', id);
    console.log('isUpdate : ', isUpdate);
    setViewId(id);
  };
  // Render table
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or Customer Name"
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
          />
        </div>

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'orderId', label: 'Order ID' },
                { key: 'customerName', label: 'Customer Name' },
                { key: 'orderStatus', label: 'Status' },
                { key: 'totalPrice', label: 'Total Price' },
                { key: 'createdAt', label: 'Date' },
                { key: 'totalProduct', label: 'Products' },
                { key: '_id', label: 'Actions' },
              ].map(column => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column.key as SortField)}
                >
                  <div
                    className={`flex items-center ${column.label === 'Actions' && 'justify-end'}`}
                  >
                    {column.label}
                    {sortField === column.key ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      )
                    ) : (
                      <div className="ml-1 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleData.map(order => (
              <React.Fragment key={order._id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  className="cursor-pointer"
                >
                  <td className="px-4 py-4 text-sm text-gray-900">{order.orderId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {order.customerInfo.customerName}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.orderStatus.toLowerCase() === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus.toLowerCase() === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.orderStatus.toLowerCase() === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    ${order.totalPrice?.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {format(new Date(order.createdAt), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{order.totalProduct}</td>
                  <td className="pr-2">
                    <div className="w-full flex items-center justify-end gap-2">
                      <Link
                        href={`/receipt/${order.orderId}`}
                        target="_blank"
                        className="border-1 border-slate-400 rounded-lg px-4 py-1 text-sm cursor-pointer"
                      >
                        Receipt
                      </Link>

                      <Dialog>
                        <DialogTrigger
                          onClick={() => handleUpdateView(order._id, 'update')}
                          className="border-1 border-slate-400 rounded-lg px-4 py-1 text-sm cursor-pointer"
                        >
                          Update
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </motion.tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, totalItems)}</span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
