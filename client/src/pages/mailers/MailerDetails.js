import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMailerQuery } from '../../store/mqvcAPI';
import { Link } from 'react-router-dom';

const MailerDetails = () => {
	const { mailerId } = useParams();
	const { data: mailer, error, isSuccess } = useMailerQuery(mailerId);

	const [isEditing, setIsEditing] = useState(false);
	const [formState, setFormState] = useState({
		subject: mailer.subject,
		body: mailer.body,
	});

	const handleChanges = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	console.log(mailer);

	return (
		<div>
			{isSuccess && (
				<div className='flex flex-col items-center justify-center w-3/4 h-full my-11 mx-auto bg-slate-100 p-11'>
					<form className='flex flex-col w-full'>
						<label
							htmlFor='subject'
							className='text-xl font-bold'>
							Subject:
						</label>
						<input
							type='text'
							name='subject'
							id='subject'
							value={mailer.subject}
							className='border border-gray-300 rounded-md p-2'
						/>
						<label
							htmlFor='body'
							className='text-xl font-bold'>
							Body:
						</label>
						<textarea
							name='body'
							id='body'
							value={mailer.body}
							className='border border-gray-300 rounded-md p-2 h-56'
						/>
						<div className='flex items-center justify-around w-full my-4'>
							<Link
								to='/mailers'
								className='bg-slate-500 text-white p-2 rounded-md w-1/5 text-center'>
								Back
							</Link>
							<button
								type='submit'
								className='bg-slate-500 text-white p-2 rounded-md w-1/5'>
								Edit
							</button>
							<button className='bg-slate-500 text-white p-2 rounded-md w-1/5'>
								Delete
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default MailerDetails;
