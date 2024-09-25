import { apiSlice } from "../../apiSlice";


export const restaurantApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["RestaurantList", "SingleRestaurant"] }).injectEndpoints({
    endpoints: (builder) => ({
        getRestaurantSearch: builder.query<any, void>({
            query: (params: any) => {
                return {
                    url: `/restaurant/list`,
                    params,
                };
            },
            providesTags: ['RestaurantList']
        }),
        getRestaurantList: builder.query<any, any>({
            query: (params: any) => {
                return {
                    url: `/restaurants-all`,
                    params,
                };
            },
            providesTags: ['RestaurantList']
        }),
        showRestaurant: builder.query({
            query: (id) => `/restaurant-view/${id}`,
            providesTags: ['SingleRestaurant']
        }),
    }),
});

export const {
    useGetRestaurantListQuery,
    useGetRestaurantSearchQuery,
    useShowRestaurantQuery
} = restaurantApiSlice;