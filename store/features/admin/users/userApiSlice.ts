import { apiSlice } from "../../apiSlice";


export const userApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["User", "OpeningClosingTime"] }).injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query<any, void>({
      query: () => "/admin/get-developers",
      providesTags: ["User"]
    }),
    singleUser: builder.query<any, void>({
      query: () => "/me",
      providesTags: ["User"]
    }),


    userAdminList: builder.query<any, void>({
      query: () => "/admin/get-users",
      providesTags: ["User"]
    }),

    userUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['User']
    }),
    userStatusChange: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user-status/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['User']
    }),
    userPasswordReset: builder.mutation({
      query: (id) => ({
        url: `/password-reset/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['User']
    }),
    restaurantOpeningClosingTimeList: builder.query<any, void>({
      query: () => "/schedules",
      providesTags: ["OpeningClosingTime"]
    }),
    restaurantOpeningClosingTime: builder.mutation({
      query: (data) => ({
        url: `/schedules`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['OpeningClosingTime']
    }),
  }),
});
export const {
  useUserListQuery,
  useUserAdminListQuery,
  useRestaurantOpeningClosingTimeMutation,
  useRestaurantOpeningClosingTimeListQuery,
  useUserUpdateMutation,
  useUserStatusChangeMutation,
  useUserPasswordResetMutation,
  useSingleUserQuery
} = userApiSlice;