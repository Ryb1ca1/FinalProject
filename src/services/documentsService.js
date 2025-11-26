// services/documentsSearchServiceAPI.js
import { apiSlice } from "./apiSlice";

export const documentsSearchServiceAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        /**
         * Поиск документов по ID
         * @param {TRequest} params - Параметры запроса
         * @returns {Promise<TArticleResponse>} Ответ с документами
         */
        documentsSearch: build.mutation({
            query: ({ idObj, token }) => ({
                method: "POST",
                url: '/api/v1/documents',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(idObj)
            }),
            // providesTags: ['login']
        })
    })
})

export const { useDocumentsSearchMutation } = documentsSearchServiceAPI;
