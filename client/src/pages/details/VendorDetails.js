import React from 'react';
import { useVendorQuery } from '../../store/mqvcAPI';
import { useParams } from 'react-router-dom';

import VendorForm from '../../components/forms/VendorForm';
import ContactCard from '../../components/cards/ContactCard';

const VendorDetails = () => {
	const id = useParams().vendorId;

	const { data: vendor, isSuccess } = useVendorQuery(id);

	console.log(vendor);

	return (
		<div>
			{isSuccess && (
				<div className='w-90%'>
					<VendorForm vendor={vendor} />
					<div className='mx-auto'>
						<h2 className='text-2xl font-bold ml-11 mb-2'>Contacts:</h2>
						<div className='flex ml-11'>
							<>
								{vendor.primary_contact && (
									<ContactCard contact={vendor.primary_contact} />
								)}
								{vendor.contacts.length > 0 ? (
									vendor.contacts.map(
										(contact) =>
											// only if the contact is not the primary contact
											contact.id !== vendor.primary_contact.id && (
												<ContactCard key={contact.id} contact={contact} />
											)
									)
								) : (
									<p>No contacts attached to vendor</p>
								)}
							</>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VendorDetails;
