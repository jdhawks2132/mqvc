import React from 'react';
import { useContactQuery } from '../../store/mqvcAPI';
import { useParams } from 'react-router-dom';

import ContactForm from '../../components/forms/ContactForm';

const ContactDetails = () => {
	const id = useParams().contactId;

	const { data, loading, error } = useContactQuery(id);

	console.log(data);

	return (
		<div>
			<h1>Contact Details</h1>
			{data && <ContactForm contact={data} />}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
		</div>
	);
};

export default ContactDetails;
