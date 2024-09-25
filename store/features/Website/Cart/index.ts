import { apiSlice } from "../../apiSlice";


export const restaurantApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["palceOrder"] }).injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (data: any) => {
                return {
                    url: `/place-order`,
                    method: "POST",
                    body: data
                };
            },
        }),

    }),
});

export const {
    usePlaceOrderMutation
} = restaurantApiSlice;