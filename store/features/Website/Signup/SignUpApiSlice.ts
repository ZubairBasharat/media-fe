import { apiSlice } from "../../apiSlice";


export const signUpApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Signup"] }).injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    getUserInfo: builder.query({
      query: (id) => `/update-restaurant/${id}`,
      transformResponse: (res: any) => res?.data,
      providesTags: ['Signup']
    }),

    userUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-restaurant/${id}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['Signup']
    }),
  }),
});

export const {
  useSignUpMutation, useGetUserInfoQuery, useUserUpdateMutation
} = signUpApiSlice;
