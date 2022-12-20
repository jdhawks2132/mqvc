import React from 'react';

import { useVendorsQuery } from '../../store/mqvcAPI';
import DashboardReadOnly from '../../components/dashboards/DashboardReadOnly';

const Dashboard = ({ currentUser }) => {
	const { data: vendors, isSuccess } = useVendorsQuery();

	console.log(currentUser);

	console.log(vendors);
	return (
		<div>
			<h2 className='m-11 text-2xl'>{currentUser.first_name}'s Vendors</h2>
			{isSuccess && vendors?.length > 0 ? (
				<table className='table-auto m-8'>
					<thead>
						<tr>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Type</th>
							<th className='px-4 py-2'>Email</th>
							<th className='px-4 py-2'>Phone</th>
							<th className='px-4 py-2'>Status</th>
							<th className='px-4 py-2'>Primary Contact</th>
							<th className='px-4 py-2'>Assigned To:</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{vendors.map((vendor) => (
							<DashboardReadOnly key={vendor.id} vendor={vendor} />
						))}
					</tbody>
				</table>
			) : (
				<h2 className='m-11 text-2xl'>No Vendors Currently Assigned</h2>
			)}
		</div>
	);
};

export default Dashboard;
