/*
|-----------------------------------------
| setting up OrdersApi for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api
import { apiSlice } from '@/redux/api/apiSlice';
import { handleError, handleSuccess } from '@/app/dashboard/orders/components/utils';
import { IOrder } from '@/app/api/orders/orderModel';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: ({ page, limit }) => `/api/v1/orders?page=${page || 1}&limit=${limit || 2}`,
      providesTags: [{ type: 'orders', id: 'LIST' }],
      async onQueryStarted() {
        try {
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    getOrderById: builder.query({
      query: id => `/api/v1/orders?id=${id}`,
    }),
    addOrder: builder.mutation({
      query: newOrder => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: [{ type: 'orders' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: IOrder; message: string } } = await queryFulfilled;
          handleSuccess(data.message);
          dispatch(ordersApi.util.invalidateTags([{ type: 'orders' }]));
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/orders`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: 'orders' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/orders`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'orders' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkUpdateOrders: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/orders?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'orders' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkDeleteOrders: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/orders?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: 'orders' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useBulkUpdateOrdersMutation,
  useBulkDeleteOrdersMutation,
  useGetOrderByIdQuery,
} = ordersApi;
