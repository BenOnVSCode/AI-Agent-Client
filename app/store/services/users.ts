import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, string>({
      query: (token:string) => ({
        url: '/getAllUsers',
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        }
      })
    }),
    deleteUser: builder.mutation<UsersResponse, { id: number, token: string }>({
      query: ({ id, token }) => ({
        url: `/deleteUser`,
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`,
        },
        method: 'POST',
        body: { id }
      })
    }),
    createUser: builder.mutation<UsersResponse, UserRequest>({
      query: (data) => ({
        url: '/createUser',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        body: data
      })
    }),
    updateUser: builder.mutation<UsersResponse, UserUpdateRequest>({
      query: (data) => ({
        url: '/updateUser',
        headers: {
          Authorization: `Bearer ${data.token.replace(/"/g, '')}`,
        },
        method: 'POST',
        body: data
      })
    })
  })
}) 

export const { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } = usersApi;