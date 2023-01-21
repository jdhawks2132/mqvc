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
		exportVendors: builder.query({
			query: () => ({
				url: 'api/v1/export-vendors',
				method: 'GET',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
		}),
		downloadCSV: builder.query({
			query: () => ({
				url: 'api/v1/download-csv',
				method: 'GET',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
				responseType: 'blob',
				body: '',
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					console.log(percentCompleted);
				},
			}),
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
	useExportVendorsQuery,
	useDownloadCSVQuery,
} = mqvcAPI;
