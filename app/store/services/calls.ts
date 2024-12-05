import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const callsApi = createApi({
  reducerPath: "callsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getCalls: builder.query<CallResponse, { page: number, token: string, filter: number[]}>({
      query: ({ page, token, filter}) => ({
        url: `getAllCalls?page=${page}&callType=${filter.join("|")}`,
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
    }),
    createBulkFinanceSaleCalls: builder.mutation<CallResponse, SaleCallExcelRequest>({
      query: (data: SaleCallExcelRequest) => ({
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        url: '/createBulkFinanceCarSaleCalls',
        method: 'POST',
        body: data,
      })
    }), 
    createFinanceSaleCall: builder.mutation<CallResponse,  SaleCallRequest>({
      query: (data: SaleCallRequest ) => ({
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`
        },
        url: '/createFinanceCarSaleCall',
        method: 'POST',
        body: data,
      })
    })    
  })
})

export const { useGetCallsQuery, useCreateVerificationCallMutation, useCreateSaleCallMutation, useCreateBulkSalesMutation, useCreateBulkFinanceSaleCallsMutation, useCreateFinanceSaleCallMutation } = callsApi