import { apiSlice } from "../../apiSlice";


export const inactiveItemApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["inactiveItem", "CategoryList"] }).injectEndpoints({
  endpoints: (builder) => ({
    inactiveItemListList: builder.query<any, void>({
      query: () => "/inactive-items",
      providesTags: ["inactiveItem", "CategoryList"]
    }),
    InactiveMenuItemActive: builder.mutation({
      query: ({ id }) => ({
        url: `/item-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["inactiveItem", "CategoryList"]
    }),
  }),

});

export const { useInactiveItemListListQuery, useInactiveMenuItemActiveMutation } = inactiveItemApiSlice;
