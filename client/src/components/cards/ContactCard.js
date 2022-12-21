import React from 'react';
import { Link } from 'react-router-dom';

const VendorContactCard = ({ contact }) => {
	const {
		id,
		first_name,
		last_name,
		phone,
		title,
		email,
		organization,
		primary,
	} = contact;

	// use tailwindcss to style the card
	return (
		<div className='px-6 py-4 shadow-lg max-w-lg rounded'>
			<Link to={`/contacts/${id}`}>
				<div className='font-bold text-xl mb-2'>
					{first_name} {last_name}
				</div>
				<p className='text-gray-700 text-base'>{title}</p>
				<p className='text-gray-700 text-base'>{organization}</p>
				<p className='text-gray-700 text-base'>{phone}</p>
				<p className='text-gray-700 text-base'>{email}</p>
				<p className='text-gray-700 text-base'>
					{primary ? <span className='text-green-500'>Primary</span> : null}
				</p>
			</Link>
		</div>
	);
};

export default VendorContactCard;
