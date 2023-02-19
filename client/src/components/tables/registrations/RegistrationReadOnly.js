import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationReadOnly = ({ registration }) => {
	return (
		<tr key={registration.id}>
			<td className='border px-4 py-2'>{registration.vendor.name}</td>
			<td className='border px-4 py-2'>{registration.registration.name}</td>
			<td className='border px-4 py-2'>{registration.status}</td>
			<td className='border px-4 py-2'>{registration.notes}</td>
			<td className='border px-4 py-2'>{registration.status}</td>
			<td className='border px-4 py-2'>
				<button className='bg-purple-700 text-white py-1 px-2 rounded hover:bg-purple-800'>
					View Details
				</button>
			</td>
		</tr>
	);
};

export default RegistrationReadOnly;
