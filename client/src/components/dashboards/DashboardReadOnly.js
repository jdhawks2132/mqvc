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
			<td className='border px-4 py-2'>{name}</td>
			<td className='border px-4 py-2'>{vendor_type}</td>
			<td className='border px-4 py-2'>
				{primary_contact ? primary_contact.email : general_email}
			</td>
			<td className='border px-4 py-2'>{phone}</td>
			<td className='border px-4 py-2'>{status}</td>
			<td className='border px-4 py-2'>
				{primary_contact ? primary_contact.first_name : 'No Primary Set'}
			</td>
			<td className='border px-4 py-2'>
				{users ? users[0].first_name : 'No Assigned To Set'}
			</td>
			<td className='border px-4 py-2'>
				<Link to={`/vendors/${vendor.id}`}>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						View Detail
					</button>
				</Link>
			</td>
		</tr>
	);
};

export default DashboardReadOnly;
