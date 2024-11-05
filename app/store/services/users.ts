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
        method: 'DELETE',
        body: { id }
      })
    }),
    createUser: builder.mutation<UsersResponse, UserRequest>({
      query: (data) => ({
        url: '/createUser',
        method: 'POST',
        body: data
      })
    }),
    updateUser: builder.mutation<UsersResponse, UserRequest>({
      query: (data) => ({
        url: '/updateUser',
        method: 'PUT',
        body: data
      })
    })
  })
}) 

export const { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } = usersApi;