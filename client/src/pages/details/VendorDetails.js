import React from 'react';
import { useVendorQuery } from '../../store/mqvcAPI';
import { useParams } from 'react-router-dom';

import VendorForm from '../../components/forms/VendorForm';

const VendorDetails = () => {
	const id = useParams().vendorId;

	const { data: vendor, isSuccess } = useVendorQuery(id);

	console.log(vendor);

	return (
		<div>
			{isSuccess && (
				<div className='w-90%'>
					<h2 className='m-11 text-2xl'>{vendor.name}</h2>
					<VendorForm vendor={vendor} />
				</div>
			)}
		</div>
	);
};

export default VendorDetails;
