import { apiSlice } from "../../apiSlice";


export const countryApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ["CountryList"] }).injectEndpoints({
    endpoints: (builder) => ({
        countryList: builder.query<any, void>({
            query: () => "/country-list",
            providesTags: ['CountryList']
        }),
    }),
});

export const {
    useCountryListQuery
} = countryApiSlice;