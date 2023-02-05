import { useState } from 'react';
import {
	useVendorQuery,
	useCurrentUserQuery,
	useMailersQuery,
} from '../../store/mqvcAPI';
import { useParams, Link } from 'react-router-dom';

import VendorForm from '../../components/forms/VendorForm';
import ContactCard from '../../components/cards/ContactCard';

const VendorDetails = () => {
	const id = useParams().vendorId;

	const { data: vendor, isSuccess } = useVendorQuery(id);
	const { data: currentUser } = useCurrentUserQuery();
	const { data: mailers } = useMailersQuery();

	const [vendorMailer, setVendorMailer] = useState({
		mailer_id: null,
		vendor_id: id,
		registration_id: null,
		contribution_id: null,
	});

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
												<ContactCard
													key={contact.id}
													contact={contact}
												/>
											)
									)
								) : (
									<>
										{currentUser.admin_level > 2 ? (
											<Link to={`/create-contact/${vendor.id}`}>
												<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
													Create Contact
												</button>
											</Link>
										) : (
											<p className='text-xl font-bold'>
												No contacts for this vendor
											</p>
										)}
									</>
								)}
							</>
						</div>
					</div>
					<div className='mx-auto'>
						<h2 className='text-2xl font-bold ml-11 mb-2 my-4'>Mailers</h2>
						<h3 className='text-xl font-bold ml-11'>Sent Mailers:</h3>
						{vendor?.vendor_mailers.length > 0 && (
							<div className='flex ml-11 '>
								{vendor?.vendor_mailers.map((mailer) => (
									<div className='flex flex-col justify-center items-center m-3 p-4 bg-white shadow-md rounded-sm'>
										<p className='text-md'>{mailer.subject}</p>
										<p className='text-sm'>{mailer.sent}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default VendorDetails;
