import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const callsApi = createApi({
  reducerPath: "callsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getCalls: builder.query<CallResponse, { page: number }>({
      query: ({ page }) => `getAllCalls?page=${page}`,
    }),
    createVerificationCall: builder.mutation<CallResponse, VerificationCallRequest>({
      query: (data: VerificationCallRequest) => ({
        url: '/createVerificationCall',
        method: 'POST',
        body: data,
      }),
    }),
  })
})

export const { useGetCallsQuery, useCreateVerificationCallMutation } = callsApi