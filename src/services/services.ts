import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://analyzer-app-server.vercel.app",
  }),
  endpoints: (builder) => ({
    getEntityList: builder.query({
      query: () => "entities",
    }),
    addEntity: builder.mutation({
      query: (body: any) => ({
        url: "entities",
        method: "POST",
        body,
      }),
    }),

    deleteEntity: builder.mutation({
      query: (id) => ({
        url: `entities/${id}`,
        method: "DELETE",
      }),
    }),

    editEntity: builder.mutation({
      query: (entity: any) => ({
        url: `entities/${entity._id}`,
        method: "PUT",
        body: entity.data,
      }),
    }),
  }),
});

export const {
  useGetEntityListQuery,
  useAddEntityMutation,
  useDeleteEntityMutation,
  useEditEntityMutation,
} = entityApi;
