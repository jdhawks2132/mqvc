import React from 'react';
import { useAdminUsersQuery } from '../../../../store/mqvcAPI';

const AdminVAInlineForm = ({
	vendorAssignment,
	handleUpdateFormChange,
	handleCancelClick,
}) => {
	const { data: users } = useAdminUsersQuery();

	const userOptions = users?.map((user) => (
		<option
			key={user.id}
			value={user.id}>
			{user.first_name} {user.last_name}
		</option>
	));

	return (
		<tr
			key={vendorAssignment.id}
			className='border px-4 py-1'>
			<td className='text-xs border px-2 py-1'>
				{vendorAssignment.vendor_name}
			</td>
			<td className='text-xs border px-2 py-1'>
				<select
					name='user_id'
					onChange={handleUpdateFormChange}>
					<option defaultValue={vendorAssignment.user_id}>
						{vendorAssignment.user_id
							? vendorAssignment.user_name
							: 'Please Select'}
					</option>
					{userOptions}
				</select>
			</td>
			<td className='border px-4 py-1'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-4 rounded text-xs'
					type='submit'>
					Save
				</button>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-xs'
					onClick={handleCancelClick}>
					Cancel
				</button>
			</td>
		</tr>
	);
};

export default AdminVAInlineForm;
