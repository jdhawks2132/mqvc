import React from 'react';
import { useVendorRegistrationsQuery } from '../../store/mqvcAPI';

const Registrations = () => {
	const { data, isSuccess } = useVendorRegistrationsQuery();

	console.log(data);
	return <div>Registrations</div>;
};

export default Registrations;
