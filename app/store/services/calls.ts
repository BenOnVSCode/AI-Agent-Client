import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const callsApi = createApi({
  reducerPath: "callsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getCalls: builder.query<CallResponse, { page: number, token: string }>({
      query: ({ page, token }) => ({
        url: `getAllCalls?page=${page}`,
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        },
      }),
    }),
    createVerificationCall: builder.mutation<CallResponse, VerificationCallRequest>({
      query: (data: VerificationCallRequest) => ({
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        url: '/createVerificationCall',
        method: 'POST',
        body: data,
      }),
    }),
    createSaleCall: builder.mutation<CallResponse, SaleCallRequest>({
      query: (data: SaleCallRequest) => ({
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        url: '/createSaleCall',
        method: 'POST',
        body: data,
      })
    }),
    createBulkSales: builder.mutation<CallResponse, SaleCallExcelRequest>({
      query: (data: SaleCallExcelRequest) => ({
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        url: '/createBulkSaleCalls',
        method: 'POST',
        body: {
          calls: data.calls,
          initiatedBy: data.initiatedBy
        },
      })
    })
  })
})

export const { useGetCallsQuery, useCreateVerificationCallMutation, useCreateSaleCallMutation, useCreateBulkSalesMutation } = callsApi