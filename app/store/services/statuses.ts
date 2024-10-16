import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statusesApi = createApi({
  reducerPath: "statusesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getStatuses: builder.query<StatusesResponse, string>({
      query: (token:string) => ({
        url: '/statuses',
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        }
      }),
    })
  })
})

export const { useGetStatusesQuery } = statusesApi