import { useState, useEffect } from 'react';
import { useVendorRegistrationsQuery } from '../../store/mqvcAPI';

import RegistrationReadOnly from '../../components/tables/registrations/RegistrationReadOnly';

const Registrations = () => {
	const { data, isLoading, isSuccess } = useVendorRegistrationsQuery();
	const [registrations, setRegistrations] = useState([]);

	useEffect(() => {
		if (isSuccess) {
			setRegistrations(data);
		}
	}, [data, isSuccess]);

	const groupedRegistrations = registrations.reduce((acc, registration) => {
		const year = registration.created_at.slice(0, 4);
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(registration);
		return acc;
	}, {});

	const groupedYears = Object.keys(groupedRegistrations).sort((a, b) => b - a);

	return (
		<div>
			<h2 className='m-11 text-2xl'>Registrations</h2>
			{isLoading && <p>Loading...</p>}
			{isSuccess && (
				<div>
					{groupedYears.map((year) => (
						<div key={year}>
							<h2 className='text-2xl text-center'>{year}</h2>
							<table className='table-auto m-8'>
								<thead>
									<tr>
										<th className='px-4 py-2'>Vendor Name</th>
										<th className='px-4 py-2'>Registration</th>
										<th className='px-4 py-2'>Status</th>
										<th className='px-4 py-2'>Notes</th>
										<th className='px-4 py-2'>Status</th>
										<th className='px-4 py-2'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{groupedRegistrations[year].map((registration) => (
										<RegistrationReadOnly
											key={registration.id}
											registration={registration}
										/>
									))}
								</tbody>
							</table>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Registrations;
