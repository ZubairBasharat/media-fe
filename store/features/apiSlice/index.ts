import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const HttpApiQuery = fetchBaseQuery({
    baseUrl: `${process.env.SERVER_URL}`,
    prepareHeaders: (headers, { getState }: any) => {
        const token = Cookies.get("token");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;

    }
})

export const apiSlice = createApi({
    reducerPath: 'resto_api_query',
    baseQuery: HttpApiQuery,
    tagTypes: [],
    endpoints: () => ({}),
})