import { apiSlice } from "../../apiSlice";


export const restaurantApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["Restaurant", "OpeningClosingTime"] }).injectEndpoints({
  endpoints: (builder) => ({
    restaurantList: builder.query<any, void>({
      query: () => "/restaurant-list",
      providesTags: ["Restaurant"]
    }),
    restaurantUpdate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/restaurants/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['Restaurant']
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

export const { useRestaurantListQuery, useRestaurantUpdateMutation, useRestaurantOpeningClosingTimeMutation, useRestaurantOpeningClosingTimeListQuery } = restaurantApiSlice;
