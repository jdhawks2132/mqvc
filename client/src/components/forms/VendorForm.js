import React, { useState, useEffect } from 'react';
import {
	states,
	vendorStatusFilters,
	vendorTypeFilters,
	booleanOptions,
} from '../../utils/options';
import {
	useCreateVendorMutation,
	useUpdateVendorMutation,
	useCurrentUserQuery,
	useAdminUsersQuery,
	useCreateVendorAssignmentMutation,
	useUpdateVendorAssignmentMutation,
} from '../../store/mqvcAPI';
import { useNavigate } from 'react-router-dom';

const VendorForm = ({ vendor }) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { data: currentUser } = useCurrentUserQuery();
	const [errorMessages, setErrorMessages] = useState(null);
	const [isUpdate, setIsUpdate] = useState(false);

	// check to see if create-vendor is in the url

	const [createVendorMutation, { error }] = useCreateVendorMutation();
	const [updateVendorMutation] = useUpdateVendorMutation();
	const [createVendorAssignmentMutation] = useCreateVendorAssignmentMutation();
	const [updateVendorAssignmentMutation] = useUpdateVendorAssignmentMutation();
	const { data: adminUsers } = useAdminUsersQuery();

	const navigate = useNavigate();

	const [formState, setFormState] = useState({
		name: vendor?.name || '',
		vendor_type: vendor?.vendor_type || '',
		status: vendor?.status || '',
		general_email: vendor?.general_email || '',
		website: vendor?.website || '',
		phone: vendor?.phone || '',
		street_address: vendor?.street_address || '',
		city: vendor?.city || '',
		state: vendor?.state || '',
		zip: vendor?.zip || '',
		country: vendor?.country || '',
		previous_participant: vendor?.previous_participant_conversion || false,
		notes: vendor?.notes || '',
	});

	const adminUserOptions = adminUsers?.map((user) => ({
		value: user.id,
		label: `${user.first_name} ${user.last_name}`,
		id: user.id,
	}));

	const [vendorAssignment, setVendorAssignment] = useState({
		id: vendor?.assigned_admin?.vendor_assignment_id || null,
		assigned_user: vendor?.assigned_admin?.admin_id || null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (!vendor) {
			setIsDisabled(false);
		}
	}, [vendor]);

	const handleUpdateToggle = () => {
		setIsDisabled(!isDisabled);
		setIsUpdate(!isUpdate);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isUpdate) {
			await updateVendorMutation({ id: vendor.id, ...formState });

			if (vendorAssignment.id) {
				await updateVendorAssignmentMutation({
					id: vendorAssignment.id,
					vendor_id: vendor.id,
					user_id: vendorAssignment.assigned_user,
				});
			} else {
				await createVendorAssignmentMutation({
					vendor_id: vendor.id,
					user_id: vendorAssignment.assigned_user,
				});
			}
			setIsDisabled(true);
		} else {
			const { data } = await createVendorMutation(formState);

			if (data) {
				await createVendorAssignmentMutation({
					vendor_id: data.id,
					user_id: vendorAssignment.assigned_user,
				});
				navigate(`/vendors/${data.id}`);
			} else {
				setErrorMessages(error?.response.data.error);
				console.log(errorMessages);
			}
		}
	};
	return (
		// vendor form style like a form with using tailwindcss
		<div>
			{vendor && currentUser.admin_level > 2 ? (
				<button
					className={`ml-11 mt-4 p-2 text-white rounded ${
						isDisabled ? 'bg-green-700 ' : 'bg-red-700'
					}`}
					onClick={handleUpdateToggle}>
					{isDisabled ? 'Click to Edit Vendor' : 'Cancel Edit'}
				</button>
			) : null}
			<form
				onSubmit={handleSubmit}
				className='w-3/4 ml-11 mt-4'>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-name'>
							Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-name'
							type='text'
							placeholder='Vendor Name'
							name='name'
							value={formState.name}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-vendor-type'>
							Type
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-vendor-type'
								name='vendor_type'
								value={formState.vendor_type}
								onChange={handleChange}
								disabled={isDisabled}>
								{vendorTypeFilters.map((type, index) => (
									<option
										key={type.label}
										value={type.value}>
										{type.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-status'>
							Status
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-status'
								name='status'
								value={formState.status}
								onChange={handleChange}
								disabled={isDisabled}>
								{vendorStatusFilters.map((status, index) => (
									<option
										key={status.label}
										value={status.value}>
										{status.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-general-email'>
							General Email
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-general-email'
							type='email'
							placeholder='General Email'
							name='general_email'
							value={formState.general_email}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-phone'>
							Phone
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-phone'
							type='text'
							placeholder='General Email'
							name='phone'
							value={formState.phone}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-website'>
							Website
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-phone'
							type='text'
							placeholder='Website'
							name='website'
							value={formState.website}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
				</div>
				{/* <div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full px-3'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-password'
					>
						Password
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-password'
						type='password'
						placeholder='******************'
					/>
					<p className='text-gray-600 text-xs italic'>
						Make it as long and as crazy as you'd like
					</p>
				</div>
			</div> */}
				<div className='flex flex-wrap -mx-3 mb-2'>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-city'>
							City
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							type='text'
							placeholder='City'
							name='city'
							value={formState.city}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-state'>
							State
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-state'
								name='state'
								value={formState.state}
								onChange={handleChange}
								disabled={isDisabled}>
								{states.map((state, index) => (
									<option
										key={state.label}
										value={state.value}>
										{state.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-zip'>
							Zip
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-zip'
							type='text'
							placeholder='Zip Code'
							name='zip'
							value={formState.zip}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-country'>
							Country
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-country'
							type='text'
							placeholder='Country'
							name='country'
							value={formState.country}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-previous_participant'>
							Previous Participant ?
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-previous_participant'
								name='previous_participant'
								value={formState.previous_participant}
								onChange={handleChange}
								disabled={isDisabled}>
								{booleanOptions.map((opts, index) => (
									<option
										key={index}
										value={opts.value}>
										{opts.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-vendor_assignment'>
							Vendor Assignment
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-vendor_assignment'
								name='vendor_assignment'
								value={formState.vendor_assignment}
								onChange={(e) => {
									setVendorAssignment({
										...vendorAssignment,
										assigned_user: e.target.value,
									});
								}}
								disabled={isDisabled}>
								<option defaultValue={vendor?.assigned_admin?.admin_id || ''}>
									{vendor?.assigned_admin?.user_name || 'Select Vendor'}
								</option>
								{adminUserOptions?.map((opts, index) => (
									<option
										key={index}
										value={opts.value}>
										{opts.label}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full px-3'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-notes'>
							Notes
						</label>
						<textarea
							className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-notes'
							type='text'
							placeholder='Notes'
							name='notes'
							value={formState.notes}
							onChange={handleChange}
							disabled={isDisabled}
						/>
						<p className='text-xs text-gray-500'>Notes Section</p>
					</div>
				</div>
				{!isDisabled && (
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'>
						{isUpdate ? 'Save Changes and Lock Vendor' : 'Submit'}
					</button>
				)}
			</form>
		</div>
	);
};

export default VendorForm;
