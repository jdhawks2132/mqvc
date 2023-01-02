import React, { useState, useEffect } from 'react';
import { vendorStatusFilters, vendorTypeFilters } from '../../utils/options';

import { useVendorsQuery } from '../../store/mqvcAPI';
import DashboardReadOnly from '../../components/dashboards/DashboardReadOnly';

const Dashboard = ({ currentUser }) => {
	const { data, isSuccess } = useVendorsQuery();
	const [vendors, setVendors] = useState([]);
	const [filters, setFilters] = useState({ status: '', vendor_type: '' });
	const [toggleSearch, setToggleSearch] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setVendors(data);
			filter();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isSuccess, filters]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters({ ...filters, [name]: value });
	};

	const filter = () => {
		let filteredVendors = [];
		if (filters.status !== '' && filters.vendor_type !== '') {
			filteredVendors = data.filter(
				(vendor) =>
					vendor.status === filters.status &&
					vendor.vendor_type === filters.vendor_type
			);
		} else if (filters.status !== '') {
			filteredVendors = data.filter(
				(vendor) => vendor.status === filters.status
			);
		} else if (filters.vendor_type !== '') {
			filteredVendors = data.filter(
				(vendor) => vendor.vendor_type === filters.vendor_type
			);
		} else {
			filteredVendors = data;
		}

		setVendors(filteredVendors);
	};

	const handleSearch = (e) => {
		const { value } = e.target;
		const filteredVendors = data.filter((vendor) =>
			vendor.name.toLowerCase().includes(value.toLowerCase())
		);
		setVendors(filteredVendors);
	};

	console.log(filters);

	return (
		<div>
			<h2 className='m-11 text-2xl'>{currentUser.first_name}'s Vendors</h2>
			<div className='flex'>
				{!toggleSearch ? (
					<>
						<select
							className='ml-11'
							name='status'
							id='vendor_status'
							onChange={handleFilterChange}
							value={filters.status}
						>
							<option value=''>Filter by Status</option>
							{vendorStatusFilters.map((filter) => (
								<option key={filter.value} value={filter.value}>
									{filter.label}
								</option>
							))}
						</select>
						<select
							className='ml-11'
							name='vendor_type'
							id='vendor_type'
							onChange={handleFilterChange}
							value={filters.vendor_type}
						>
							<option value=''>Filter by Type</option>
							{vendorTypeFilters.map((filter) => (
								<option key={filter.value} value={filter.value}>
									{filter.label}
								</option>
							))}
						</select>
						<button
							className='ml-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
							}}
						>
							Reset Filters
						</button>
						<button
							className='ml-4 bg-purple-700 text-white py-1 px-2 rounded hover:bg-purple-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
								setToggleSearch(true);
							}}
						>
							Search by Vendor Name
						</button>
					</>
				) : (
					<div className='ml-11'>
						<input
							className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
							type='search'
							name='search'
							placeholder='Vendor Name'
							onChange={handleSearch}
						/>
						<button type='submit' className='absolute right-0 top-0 mt-5 mr-4'>
							<svg
								className='text-gray-600 h-4 w-4 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 56.966 56.966'
							>
								<path d='M55.525 52.941l-14.14-14.14c1.688-2.344 2.688-5.203 2.688-8.301C47.453 12.703 34.75 0 23.727 0S0 12.703 0 23.727s12.703 23.727 23.727 23.727c3.098 0 5.957-1 8.301-2.688l14.14 14.14c.586.586 1.34.879 2.121.879s1.535-.293 2.121-.879c1.172-1.172 1.172-3.071 0-4.243zM23.727 42.453c-9.293 0-16.727-7.434-16.727-16.727S14.434 8.999 23.727 8.999s16.727 7.434 16.727 16.727-7.434 16.727-16.727 16.727z' />
							</svg>
						</button>
						<button
							className='ml-4 bg-purple-700 text-white py-1 px-2 rounded hover:bg-purple-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
								setToggleSearch(false);
							}}
						>
							Filter by Status and Type
						</button>
					</div>
				)}
			</div>
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
				<h2 className='m-11 text-2xl'>
					{data?.length > 0
						? 'No Matching Vendors'
						: 'No Vendors Assigned - please contact administrators'}
				</h2>
			)}
		</div>
	);
};

export default Dashboard;
