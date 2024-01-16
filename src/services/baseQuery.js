import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    }
});

export default baseQuery;