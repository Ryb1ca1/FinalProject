// services/objectSearchServiceAPI.js
import { apiSlice } from "./apiSlice.js";

export const objectSearchServiceAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        histogramSearch: build.mutation({
            query: ({ data, token }) => ({
                method: "POST",
                url: '/api/v1/objectsearch/histograms',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }),
        objectSearch: build.mutation({
            query: ({ data, token }) => ({
                method: "POST",
                url: '/api/v1/objectsearch',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
        })
    })
})

export const { useHistogramSearchMutation, useObjectSearchMutation } = objectSearchServiceAPI;
