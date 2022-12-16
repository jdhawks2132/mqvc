import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mqvcAPI = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	tagTypes: ['user', 'vendor', 'contact'],
	endpoints: (builder) => ({
		currentUser: builder.query({
			query: () => 'me',
			providesTags: ['user'],
		}),
		signIn: builder.mutation({
			query: (user) => ({
				url: 'users/sign_in',
				method: 'POST',
				body: { user },
			}),
			invalidateTags: ['user'],
		}),
	}),
});

export const { useCurrentUserQuery, useSignInMutation } = mqvcAPI;
