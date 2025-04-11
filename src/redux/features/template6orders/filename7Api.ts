/*
|-----------------------------------------
| setting up _1_template_Api for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

// This file is use for rest api
import { apiSlice } from '@/redux/api/apiSlice';
import IDBOrderData from '@/app/api/orders/orderModel';
import { handleError, handleSuccess } from '@/app/template6/components/utils';

export const _2_template_Api = apiSlice.injectEndpoints({
  endpoints: builder => ({
    get_1_template_: builder.query({
      query: ({ page, limit }) => `/api/v1/orders?page=${page || 1}&limit=${limit || 2}`,
      providesTags: [{ type: '_5_template_tags_', id: 'LIST' }],
      async onQueryStarted() {
        try {
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    get_3_template_ById: builder.query({
      query: id => `/api/v1/orders?id=${id}`,
    }),
    add_3_template_: builder.mutation({
      query: new_3_template_ => ({
        url: '/api/v1/orders',
        method: 'POST',
        body: new_3_template_,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data }: { data: { data: typeof IDBOrderData; message: string } } =
            await queryFulfilled;
          handleSuccess(data.message);
          dispatch(_2_template_Api.util.invalidateTags([{ type: '_5_template_tags_' }]));
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    update_3_template_: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/orders`,
        method: 'PUT',
        body: { id: id, ...data },
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    delete_3_template_: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/orders`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkUpdate_1_template_: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/orders?bulk=true`,
        method: 'PUT',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data }: { data: { message: string } } = await queryFulfilled;
          handleSuccess(data.message);
        } catch (e: unknown) {
          handleError(e);
        }
      },
    }),
    bulkDelete_1_template_: builder.mutation({
      query: bulkData => ({
        url: `/api/v1/orders?bulk=true`,
        method: 'DELETE',
        body: bulkData,
      }),
      invalidatesTags: [{ type: '_5_template_tags_' }],
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
  useGet_1_template_Query,
  useAdd_3_template_Mutation,
  useUpdate_3_template_Mutation,
  useDelete_3_template_Mutation,
  useBulkUpdate_1_template_Mutation,
  useBulkDelete_1_template_Mutation,
  useGet_3_template_ByIdQuery,
} = _2_template_Api;
