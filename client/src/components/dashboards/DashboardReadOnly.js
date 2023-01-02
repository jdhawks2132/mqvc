import React from 'react';
import { Link } from 'react-router-dom';

const DashboardReadOnly = ({ vendor }) => {
	const {
		name,
		vendor_type,
		general_email,
		phone,
		status,
		primary_contact,
		users,
	} = vendor;
	return (
		<tr>
			<td className='border px-2 py-1 text-xs'>{name}</td>
			<td className='border px-2 py-1 text-xs'>{vendor_type}</td>
			<td className='border px-2 py-1 text-xs'>
				{primary_contact ? primary_contact.email : general_email}
			</td>
			<td className='border px-2 py-1 text-xs'>{phone}</td>
			<td className='border px-2 py-1 text-xs'>{status}</td>
			<td className='border px-2 py-1 text-xs'>
				{primary_contact ? primary_contact.first_name : 'No Primary Set'}
			</td>
			<td className='border px-2 py-1 text-xs '>
				{users && users[0] ? users[0].first_name : 'Not Assigned'}
			</td>
			<td className='border px-2 py-1 text-xs'>
				<Link to={`/vendors/${vendor.id}`}>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
						View
					</button>
				</Link>
			</td>
		</tr>
	);
};

export default DashboardReadOnly;
