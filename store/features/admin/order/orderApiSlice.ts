import { apiSlice } from "../../apiSlice";


export const orderApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["order"] }).injectEndpoints({
  endpoints: (builder) => ({
    orderListList: builder.query<any, void>({
      query: () => "/orders",
      providesTags: ["order"]
    }),
    orderCancel: builder.mutation({
      query: ({ id }) => ({
        url: `/order-cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['order']
    }),

    orderUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/order-status/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['order']
    }),
  }),

});

export const { useOrderListListQuery, useOrderCancelMutation, useOrderUpdateMutation } = orderApiSlice;
