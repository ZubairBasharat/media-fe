import { apiSlice } from "../../apiSlice";


export const inactiveExtraItemApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["inactiveExtraItem", "menus", "CategoryList", "menu"] }).injectEndpoints({
  endpoints: (builder) => ({
    inactiveExtraItemList: builder.query<any, void>({
      query: () => "/inactive-extra-items",
      providesTags: ["inactiveExtraItem", "CategoryList"]
    }),
    InactiveExtraItemActive: builder.mutation({
      query: ({ id }) => ({
        url: `/extra-item-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["inactiveExtraItem", "CategoryList"]
    }),
  }),

});

export const { useInactiveExtraItemListQuery, useInactiveExtraItemActiveMutation } = inactiveExtraItemApiSlice;
