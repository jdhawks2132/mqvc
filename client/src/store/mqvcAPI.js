import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mqvcAPI = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	tagTypes: ['User', 'Vendor', 'Contact', 'Mailer'],
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
		tinyMceKey: builder.query({
			query: () => 'api/v1/tiny-api',
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
		uploadVendors: builder.mutation({
			query: (file) => ({
				url: 'api/v1/import-vendors',
				method: 'POST',
				body: file,
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
		createVendorAssignment: builder.mutation({
			query: (vendorAssignment) => ({
				url: 'api/v1/vendor_assignments',
				method: 'POST',
				body: vendorAssignment,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Vendor'],
		}),
		updateVendorAssignment: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `api/v1/vendor_assignments/${id}`,
				method: 'PUT',
				body: rest,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Vendor'],
		}),
		deleteVendorAssignment: builder.mutation({
			query: (id) => ({
				url: `api/v1/vendor_assignments/${id}`,
				method: 'DELETE',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Vendor'],
		}),
		adminUsers: builder.query({
			query: () => 'api/v1/admin-users-list',
			providesTags: ['Vendor'],
		}),
		mailers: builder.query({
			query: () => 'api/v1/mailers',
			providesTags: ['Mailer'],
		}),
		mailer: builder.query({
			query: (id) => `api/v1/mailers/${id}`,
			providesTags: ['Mailer'],
		}),
		createMailer: builder.mutation({
			query: (mailer) => ({
				url: 'api/v1/mailers',
				method: 'POST',
				body: mailer,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Mailer'],
		}),
		updateMailer: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `api/v1/mailers/${id}`,
				method: 'PUT',
				body: rest,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Mailer'],
		}),
		deleteMailer: builder.mutation({
			query: (id) => ({
				url: `api/v1/mailers/${id}`,
				method: 'DELETE',
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Mailer'],
		}),
		emailVendor: builder.query({
			query: (vendorId, mailerId) => ({
				url: `api/v1/email-vendors/${vendorId}/mailers/${mailerId}`,
				providesTags: ['Mailer', 'Vendor'],
			}),
		}),
		sendMassEmail: builder.mutation({
			query: (mailerInfo) => ({
				url: `api/v1/mailers/send-mass-email`,
				method: 'POST',
				body: mailerInfo,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Mailer', 'Vendor'],
		}),
		createContribution: builder.mutation({
			query: (contribution) => ({
				url: 'api/v1/contributions',
				method: 'POST',
				body: contribution,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Contribution', 'Vendor'],
		}),
		createRegistration: builder.mutation({
			query: (registration) => ({
				url: 'api/v1/registrations',
				method: 'POST',
				body: registration,
				credentials: 'include',
				headers: { Authorization: localStorage.getItem('jwt') },
			}),
			invalidatesTags: ['Registration', 'Vendor'],
		}),
	}),
});

export const {
	useCurrentUserQuery,
	useTinyMceKeyQuery,
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
	useCreateVendorAssignmentMutation,
	useUpdateVendorAssignmentMutation,
	useDeleteVendorAssignmentMutation,
	useAdminUsersQuery,
	useMailersQuery,
	useMailerQuery,
	useCreateMailerMutation,
	useUpdateMailerMutation,
	useDeleteMailerMutation,
	useSendMassEmailMutation,
	useCreateContributionMutation,
	useCreateRegistrationMutation,
} = mqvcAPI;
