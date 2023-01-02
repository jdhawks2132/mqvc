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
		contacts: builder.query({
			query: () => 'api/v1/contacts',
			providesTags: ['contact'],
		}),
		contact: builder.query({
			query: (id) => `api/v1/contacts/${id}`,
			providesTags: ['contact'],
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
		createVendor: builder.mutation({
			query: (vendor) => ({
				url: 'api/v1/vendors',
				method: 'POST',
				body: vendor,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidateTags: ['vendor'],
		}),
	}),
});

export const {
	useCurrentUserQuery,
	useVendorsQuery,
	useVendorQuery,
	useContactsQuery,
	useContactQuery,
	useSignOutMutation,
	useCreateVendorMutation,
} = mqvcAPI;
