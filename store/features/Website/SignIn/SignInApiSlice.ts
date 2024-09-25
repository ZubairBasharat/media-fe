import { apiSlice } from "../../apiSlice";



export const signInApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Signup"] }).injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => ({
                url: "/auth/customer/login",
                method: "POST",
                body: data,
            }),
        }),
        superAdminSignIn: builder.mutation({
            query: (data) => ({
                url: "/auth/admin/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useSignInMutation,
    useSuperAdminSignInMutation
} = signInApiSlice;