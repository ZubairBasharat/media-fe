import { apiSlice } from "../../apiSlice";


export const menusApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["menus", "CategoryList", "menu"] }).injectEndpoints({
  endpoints: (builder) => ({
    categoryList: builder.query<any, void>({
      query: () => "/menus",
      providesTags: ["CategoryList"]
    }),
    categoryCreate: builder.mutation({
      query: (data) => ({
        url: "/menus",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CategoryList"]
    }),
    categoryNewCarItemCreate: builder.mutation({
      query: (data) => {
        return {
          url: "/items",
          method: "POST",
          body: JSON.stringify(data),
        }
      },
      invalidatesTags: ["CategoryList"]
    }),
    categorySingle: builder.query({
      query: (id) => `/menus/${id}`,
      providesTags: ['CategoryList']
    }),

    categoryUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/menus/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['CategoryList']
    }),
    innerCategoryCardUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['CategoryList']
    }),

    menuCreate: builder.mutation({
      query: (data) => ({
        url: "/extra-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["menu"]
    }),

    menuList: builder.query<any, void>({
      query: () => "/extra-item",
      providesTags: ["menu"]
    }),

    menuUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/extra-item/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['menu']
    }),

  }),
});

export const { useCategoryListQuery, useCategoryCreateMutation, useCategorySingleQuery, useCategoryUpdateMutation, useCategoryNewCarItemCreateMutation, useInnerCategoryCardUpdateMutation, useMenuCreateMutation, useMenuListQuery, useMenuUpdateMutation } = menusApiSlice;
