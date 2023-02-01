import React from 'react';
import { useVendorAssignmentsQuery } from '../../store/mqvcAPI';

const AdminDashboard = () => {
	const {
		data: vendorAssignments,
		error,
		isSuccess,
	} = useVendorAssignmentsQuery();

	console.log(vendorAssignments);
	return (
		<div>
			<h1 className='text-2xl font-bold m-11'>Admin Dashboard</h1>
			{isSuccess && (
				<div className='mx-auto'>
					<h2 className='text-xl text-center my-4'>Vendor Assignments</h2>
					<table className='table-auto mx-auto'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Vendor</th>

								<th className='px-4 py-2'>User Assigned To</th>

								<th className='px-4 py-2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{vendorAssignments.map((vendorAssignment) => (
								<tr key={vendorAssignment.id}>
									<td className='text-xs border px-2 py-1'>
										{vendorAssignment.vendor_name}
									</td>
									<td className='text-xs border px-2 py-1'>
										{vendorAssignment.user_name}
									</td>

									<td className='border px-4 py-1'>
										<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-4 rounded text-xs '>
											Edit
										</button>
										<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-xs '>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{error && <p>{error.message}</p>}
		</div>
	);
};

export default AdminDashboard;
