import React from 'react';
import { useContactQuery } from '../../store/mqvcAPI';
import { useParams } from 'react-router-dom';

import ContactForm from '../../components/forms/ContactForm';

const ContactDetails = () => {
	const id = useParams().contactId;

	const { data, loading, error } = useContactQuery(id);

	return (
		<div>
			<h2 className='text-2xl font-bold m-11'>Contact Details</h2>
			{data && <ContactForm contact={data} />}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
		</div>
	);
};

export default ContactDetails;
