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
						<h2 className='text-2xl font-bold ml-11 mb-2 my-4'>Mailers:</h2>
						{vendor?.vendor_mailers.length > 0 ? (
							<div className='flex flex-col text-center justify-center items-center bg-slate-50 w-1/2 ml-11 my-11 p-11 rounded-md shadow-md'>
								<h3 className='text-xl font-bold'>Sent Mailers:</h3>
								<table className='table-auto bg-white p-4 m-4 w-11/12'>
									<thead>
										<tr>
											<th className='text-md px-4 py-2'>Subject</th>
											<th className='text-md px-4 py-2'>Sent</th>
										</tr>
									</thead>
									<tbody>
										{vendor?.vendor_mailers.map((mailer) => (
											<tr key={mailer.id}>
												<td className='text-sm border px-4 py-1'>
													{mailer.subject}
												</td>
												<td className='text-sm border px-4 py-1'>
													{mailer.sent}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className='flex flex-col justify-center items-center ml-11 p-4 bg-white shadow-md rounded-sm w-1/6'>
								<p className='text-md'>No Mailers Sent</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default VendorDetails;
