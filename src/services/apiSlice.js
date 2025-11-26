import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://gateway.scan-interfax.ru";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL  // ✅ Используем переменную окружения
    }),
    tagTypes: ['login'],
    endpoints: () => ({}),
});
