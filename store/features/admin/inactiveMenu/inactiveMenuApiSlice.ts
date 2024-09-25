import { apiSlice } from "../../apiSlice";


export const inactiveMenuApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["inactiveMenu", "CategoryList"] }).injectEndpoints({
  endpoints: (builder) => ({
    inactiveMenuListList: builder.query<any, void>({
      query: () => "/inactive-menus",
      providesTags: ["inactiveMenu", "CategoryList"]
    }),
    InactiveMenuListActive: builder.mutation({
      query: ({ id }) => ({
        url: `/menu-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["inactiveMenu", "CategoryList"]
    }),
  }),

});

export const { useInactiveMenuListListQuery, useInactiveMenuListActiveMutation } = inactiveMenuApiSlice;
