import React, { useState, useEffect } from 'react';
import { useCurrentUserQuery } from '../../store/mqvcAPI';

const VendorForm = ({ vendor }) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { data: currentUser } = useCurrentUserQuery();

	useEffect(() => {
		if (currentUser.admin_level > 2) {
			setIsDisabled(false);
		}
	}, [currentUser]);

	const [formState, setFormState] = useState({
		name: '',
		vendor_type: '',
		status: '',
		general_email: '',
		website: '',
		phone: '',
		street_address: '',
		city: '',
		zip: '',
		country: '',
		previous_participant: '',
		notes: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		// vendor form style like a form with using tailwindcss
		<form className='w-3/4 m-11'>
			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-name'
					>
						Name
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-name'
						type='text'
						placeholder='Vendor Name'
						value={vendor ? vendor.name : formState.name}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-vendor-type'
					>
						Vendor Type
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-vendor-type'
						type='text'
						placeholder='Vendor Type'
						value={vendor ? vendor.vendor_type : formState.vendor_type}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-status'
					>
						Status
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-status'
						type='text'
						placeholder='Status'
						value={vendor ? vendor.status : formState.status}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-general-email'
					>
						General Email
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-general-email'
						type='text'
						placeholder='General Email'
						value={vendor ? vendor.general_email : formState.general_email}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-phone'
					>
						Phone
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-phone'
						type='text'
						placeholder='General Email'
						value={vendor ? vendor.phone : formState.phone}
						onChange={handleChange}
						disabled={isDisabled}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-website'
					>
						Website
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-phone'
						type='text'
						placeholder='Website'
						value={vendor ? vendor.website : formState.website}
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
						htmlFor='grid-city'
					>
						City
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-city'
						type='text'
						placeholder='City'
						value={vendor ? vendor.city : formState.city}
						onChange={handleChange}
						disabled={currentUser.admin_level < 3 ? true : false}
					/>
				</div>
				<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-state'
					>
						State
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-state'
						>
							<option>New Mexico</option>
							<option>Missouri</option>
							<option>Texas</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>
				<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
						htmlFor='grid-zip'
					>
						Zip
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='grid-zip'
						type='text'
						placeholder='90210'
					/>
				</div>
			</div>
		</form>
	);
};

export default VendorForm;
