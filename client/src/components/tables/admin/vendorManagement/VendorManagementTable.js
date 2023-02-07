import React from 'react';
import { useVendorsQuery } from '../../../../store/mqvcAPI';
import { Link } from 'react-router-dom';

const VendorManagementTable = () => {
	const { data, isSuccess } = useVendorsQuery({
		refetchOnMountOrArgChange: true,
	});

	if (isSuccess) {
		console.log(data);
	}

	return (
		<table className='table-auto mx-auto'>
			<thead>
				<tr>
					<th className='px-4 py-2'>ID</th>
					<th className='px-4 py-2'>Vendor</th>
					<th className='px-4 py-2'>Contributions</th>
					<th className='px-4 py-2'>Registrations</th>
					<th className='px-4 py-2'>Action</th>
				</tr>
			</thead>
			<tbody>
				{isSuccess &&
					data.map((vendor) => (
						<tr key={vendor.id}>
							<td className='border px-2 py-1 text-xs'>{vendor.id}</td>
							<td className='border px-2 py-1 text-xs'>{vendor.name}</td>
							<td className='border px-2 py-1 text-xs'>
								{vendor.vendor_contributions.length}
							</td>
							<td className='border px-2 py-1 text-xs'>
								{vendor.vendor_registrations.length}
							</td>
							<td className='border px-2 py-1 text-xs'>
								<Link to={`/vendors/${vendor.id}`}>
									<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded'>
										View
									</button>
								</Link>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default VendorManagementTable;
