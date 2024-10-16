import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials: {email: string, password: string}) => ({
        url: '/loginUser',
        method: 'POST',
        body: credentials,
      }),
    }),
    profile: builder.query<ProfileResponse, string>({
      query: (token:string) => ({
        url: '/profile',
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        }
      })
    })
  }),
});


export const { useLoginUserMutation, useProfileQuery } = authApi;
