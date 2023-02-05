import React, { useState, useEffect } from 'react';
import { vendorStatusFilters, vendorTypeFilters } from '../../utils/options';

import {
	useVendorsQuery,
	useMailersQuery,
	useSendMassEmailMutation,
} from '../../store/mqvcAPI';
import DashboardReadOnly from '../../components/dashboards/DashboardReadOnly';

const Dashboard = ({ currentUser }) => {
	const { data, isSuccess } = useVendorsQuery({
		refetchOnMountOrArgChange: true,
	});

	const { data: mailers, isSuccess: isSuccessMailers } = useMailersQuery();
	const [sendMassEmail] = useSendMassEmailMutation();

	const [vendors, setVendors] = useState([]);
	const [filters, setFilters] = useState({ status: '', vendor_type: '' });
	const [toggleSearch, setToggleSearch] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedVendors, setSelectedVendors] = useState([]);
	const [selectedMailer, setSelectedMailer] = useState('');

	const handleMailerChange = (e) => {
		setSelectedMailer(e.target.value);
	};

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

	console.log(selectedMailer, selectedVendors);

	// create options of the existing mailers for the mass email modal
	const mailerOptions = mailers?.map((mailer) => ({
		id: mailer.id,
		value: mailer.id,
		label: mailer.subject,
	}));

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
		setSelectedVendors(filteredVendors);
	};

	console.log(currentUser);
	const handleSearch = (e) => {
		const { value } = e.target;
		const filteredVendors = data.filter((vendor) =>
			vendor.name.toLowerCase().includes(value.toLowerCase())
		);
		setVendors(filteredVendors);
	};

	const handleToggleModal = () => {
		setSelectedMailer('');
		setModalIsOpen(!modalIsOpen);
	};

	const handleSendMailers = async () => {
		const vendor_ids = selectedVendors.map((vendor) => vendor.id);
		const mailer_id = selectedMailer;

		const mailerInfoObj = {
			vendor_ids,
			mailer_id,
		};

		const res = await sendMassEmail(mailerInfoObj);

		if (res.data) {
			setSelectedMailer('');
			setModalIsOpen(!modalIsOpen);
		} else {
			console.log('error');
		}
	};

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
							value={filters.status}>
							{vendorStatusFilters.map((filter) => (
								<option
									key={filter.value}
									value={filter.value}>
									{filter.label}
								</option>
							))}
						</select>
						<select
							className='ml-11'
							name='vendor_type'
							id='vendor_type'
							onChange={handleFilterChange}
							value={filters.vendor_type}>
							{vendorTypeFilters.map((filter) => (
								<option
									key={filter.value}
									value={filter.value}>
									{filter.label}
								</option>
							))}
						</select>
						<button
							className='ml-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
							}}>
							Reset Filters
						</button>
						<button
							className='ml-4 bg-purple-700 text-white py-1 px-2 rounded hover:bg-purple-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
								setToggleSearch(true);
							}}>
							Search by Vendor Name
						</button>
						{/* toggle the mass email modal */}
						{currentUser && currentUser.admin_level > 2 ? (
							<button
								className='ml-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-800'
								onClick={handleToggleModal}>
								Mass Email
							</button>
						) : null}
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
						<button
							type='submit'
							className='absolute right-0 top-0 mt-5 mr-4'></button>
						<button
							className='ml-4 bg-purple-700 text-white py-1 px-2 rounded hover:bg-purple-800'
							// reset filters and set options back to default
							onClick={() => {
								setFilters({ status: '', vendor_type: '' });
								setToggleSearch(false);
							}}>
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
							<DashboardReadOnly
								key={vendor.id}
								vendor={vendor}
							/>
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
			{/* email modal */}
			{isSuccessMailers && isSuccess && modalIsOpen && (
				// style div below to make modal using tailwind css
				<div
					className='mass-mailer-modal 
					fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center'>
					<div className='flex flex-col items-center bg-slate-100 p-11'>
						<h2 className='text-2xl'>Mass Email</h2>
						<div className='flex flex-col items-center'>
							<label
								className='mt-4'
								htmlFor='subject'>
								Subject
							</label>
							<select
								className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
								value={selectedMailer}
								onChange={handleMailerChange}>
								<option value=''>Select Subject</option>
								{mailerOptions.map((option) => (
									<option
										key={option.id}
										value={option.id}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						{selectedMailer !== '' && (
							<p>
								You will send this email to {selectedVendors.length} vendors
							</p>
						)}
						<div className='flex flex-row justify-center mt-4'>
							<button
								className='bg-green-500 text-white py-1 px-2 rounded hover:bg-green-800'
								onClick={handleSendMailers}>
								Send
							</button>
							<button
								className='ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-800'
								onClick={handleToggleModal}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
