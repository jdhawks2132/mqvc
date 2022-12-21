import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mqvcAPI = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	tagTypes: ['user', 'vendor', 'contact'],
	endpoints: (builder) => ({
		currentUser: builder.query({
			query: () => ({
				url: 'member-data',
				method: 'GET',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			providesTags: ['user'],
		}),
		vendors: builder.query({
			query: () => 'api/v1/vendors',
			providesTags: ['vendor'],
		}),
		vendor: builder.query({
			query: (id) => `api/v1/vendors/${id}`,
			providesTags: ['vendor'],
		}),
		signOut: builder.mutation({
			query: () => ({
				url: 'users/sign_out',
				method: 'DELETE',
				body: {},
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidateTags: ['user'],
		}),
	}),
});

export const {
	useCurrentUserQuery,
	useVendorsQuery,
	useVendorQuery,
	useSignOutMutation,
} = mqvcAPI;
