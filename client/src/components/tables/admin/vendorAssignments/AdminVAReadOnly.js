import React from 'react';

const AdminVAReadOnly = ({
	vendorAssignment,
	handleUpdateClick,
	handleDelete,
}) => {
	return (
		<tr key={vendorAssignment.id}>
			<td className='text-xs border px-2 py-1'>
				{vendorAssignment.vendor_name}
			</td>
			<td className='text-xs border px-2 py-1'>{vendorAssignment.user_name}</td>

			<td className='border px-4 py-1'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-4 rounded text-xs'
					onClick={(e) => handleUpdateClick(e, vendorAssignment)}>
					Update
				</button>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-xs'
					onClick={(e) => {
						handleDelete(e, vendorAssignment);
					}}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default AdminVAReadOnly;
