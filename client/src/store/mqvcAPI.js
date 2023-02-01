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
				url: 'users/sign_out',
				method: 'DELETE',
				body: {},
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['User'],
		}),
		createVendor: builder.mutation({
			query: (vendor) => ({
				url: 'api/v1/vendors',
				method: 'POST',
				body: vendor,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Vendor'],
		}),
		updateVendor: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `api/v1/vendors/${id}`,
				method: 'PUT',
				body: rest,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Vendor'],
		}),
		createContact: builder.mutation({
			query: (contact) => ({
				url: 'api/v1/contacts',
				method: 'POST',
				body: contact,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Contact'],
		}),
		updateContact: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `api/v1/contacts/${id}`,
				method: 'PUT',
				body: rest,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Contact', 'Vendor'],
		}),
		createVendorContact: builder.mutation({
			query: (vendorContact) => ({
				url: 'api/v1/contacts/create-vendor-contact',
				method: 'POST',
				body: vendorContact,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
				invalidatesTags: ['Vendor', 'Contact'],
			}),
			invalidatesTags: ['Vendor', 'Contact'],
		}),
		vendorAssignments: builder.query({
			query: () => `api/v1/vendor_assignments`,
			providesTags: ['Vendor'],
		}),
		uploadVendors: builder.mutation({
			query: (file) => ({
				url: 'api/v1/import-vendors',
				method: 'POST',
				body: file,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
				invalidatesTags: ['Vendor'],
			}),
			invalidatesTags: ['Vendor'],
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
	useUpdateVendorMutation,
	useCreateContactMutation,
	useUpdateContactMutation,
	useCreateVendorContactMutation,
	useVendorAssignmentsQuery,
	useUploadVendorsMutation,
} = mqvcAPI;
