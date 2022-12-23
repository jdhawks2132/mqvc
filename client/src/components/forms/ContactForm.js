import React, { useState, useEffect } from 'react';
import { useCurrentUserQuery } from '../../store/mqvcAPI';
import { states } from '../../utils/options';

const ContactForm = ({ contact }) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { data: currentUser } = useCurrentUserQuery();

	// contact schema from rails:

	// t.string "first_name"
	// t.string "last_name"
	// t.string "street_address"
	// t.string "city"
	// t.string "state"
	// t.string "zip_code"
	// t.string "phone"
	// t.string "title"
	// t.string "organization"
	// t.string "email"
	// t.datetime "created_at", null: false
	// t.datetime "updated_at", null: false
	// t.boolean "primary"

	const [formState, setFormState] = useState({
		first_name: contact.first_name || '',
		last_name: contact.last_name || '',
		street_address: contact.street_address || '',
		city: contact.city || '',
		state: contact.state || '',
		zip_code: contact.zip_code || '',
		phone: contact.phone || '',
		title: contact.title || '',
		organization: contact.organization || '',
		email: contact.email || '',
		primary: contact.primary || false,
	});

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<form className='w-3/4 ml-11 mt-4'>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-first-name'
						>
							First Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-first-name'
							type='text'
							placeholder='First Name'
							name='first_name'
							value={formState.first_name}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-last-name'
						>
							Last Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-last-name'
							type='text'
							placeholder='Last Name'
							name='last_name'
							value={formState.last_name}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='title'
						>
							Title
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-title'
							type='text'
							placeholder='Title'
							name='title'
							value={formState.title}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='organization'
						>
							Organization
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-organization'
							type='text'
							placeholder='Organization'
							name='organization'
							value={formState.organization}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='email'
						>
							Email
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-email'
							type='email'
							placeholder='Email'
							name='email'
							value={formState.email}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='phone'
						>
							Phone
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-phone'
							type='text'
							placeholder='Phone'
							name='phone'
							value={formState.phone}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-2'>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-street-address'
						>
							Address
						</label>
						<input
							className='appearance-none block w-full bg-gray-100 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-street-address'
							type='text'
							placeholder='Address'
							name='street_address'
							value={formState.street_address}
							onChange={handleChange}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-city'
						>
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
							htmlFor='grid-state'
						>
							State
						</label>
						<div className='relative'>
							<select
								className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-state'
								name='state'
								value={formState.state}
								onChange={handleChange}
								disabled={isDisabled}
							>
								{states.map((state, index) => (
									<option key={state.label} value={state.value}>
										{state.label}
									</option>
								))}
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
							className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='grid-zip'
							type='text'
							placeholder='Zip Code'
							name='zip'
							value={formState.zip_code}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
					<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							htmlFor='grid-primary'
						>
							Primary Contact?
						</label>
						<input
							className={`appearance-none block w-full bg-gray-100 text-gray-800 border ${
								contact.primary ? 'border-emerald-600 ' : 'border-red-600'
							} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
							id='grid-primary'
							type='text'
							placeholder='Primary Contact'
							name='primary'
							value={formState.primary ? 'Yes' : 'No'}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
