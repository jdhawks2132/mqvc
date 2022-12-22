import React from 'react';
import { useContactQuery } from '../../store/mqvcAPI';
import { useParams } from 'react-router-dom';

const ContactDetails = () => {
	const id = useParams().contactId;

	const { data, loading, error } = useContactQuery(id);

	console.log(data);

	return <div>ContactDetails</div>;
};

export default ContactDetails;
