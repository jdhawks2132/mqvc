import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mqvcAPI = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	tagTypes: ['User', 'Vendor', 'Contact'],
	endpoints: (builder) => ({
		currentUser: builder.query({
			query: () => ({
				url: 'member-data',
				method: 'GET',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			providesTags: ['User'],
		}),
		vendors: builder.query({
			query: () => 'api/v1/vendors',
			providesTags: ['Vendor'],
		}),
		vendor: builder.query({
			query: (id) => `api/v1/vendors/${id}`,
			providesTags: ['Vendor'],
		}),
		contacts: builder.query({
			query: () => 'api/v1/contacts',
			providesTags: ['Contact'],
		}),
		contact: builder.query({
			query: (id) => `api/v1/contacts/${id}`,
			providesTags: ['Contact'],
		}),
		signOut: builder.mutation({
			query: () => ({
				url: 'Users/sign_out',
				method: 'DELETE',
				body: {},
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidateTags: ['User'],
		}),
		createVendor: builder.mutation({
			query: (vendor) => ({
				url: 'api/v1/vendors',
				method: 'POST',
				body: vendor,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidateTags: ['Vendor'],
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
