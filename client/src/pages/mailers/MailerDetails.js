import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	useMailerQuery,
	useUpdateMailerMutation,
	useDeleteMailerMutation,
} from '../../store/mqvcAPI';
import { Link, useNavigate } from 'react-router-dom';

const MailerDetails = () => {
	const { mailerId } = useParams();
	const { data: mailer, error, isSuccess } = useMailerQuery(mailerId);
	const [updateMailer] = useUpdateMailerMutation();
	const [deleteMailer] = useDeleteMailerMutation();

	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [formState, setFormState] = useState({
		subject: mailer?.subject,
		body: mailer?.body,
	});

	useEffect(() => {
		setFormState({
			subject: mailer?.subject,
			body: mailer?.body,
		});
	}, [mailer]);

	const handleChanges = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleEditClick = (e) => {
		e.preventDefault();
		setIsEditing(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEditing) {
			updateMailer({
				id: mailerId,
				...formState,
			});
			setIsEditing(false);
		}
	};

	const handleDeleteClick = async (e) => {
		e.preventDefault();

		const resp = await deleteMailer(mailerId);

		if (resp) {
			navigate('/mailers');
		} else {
			alert('There was an error deleting this mailer.');
		}
	};

	return (
		<div>
			{mailer && (
				<div className='flex flex-col items-center justify-center w-3/4 h-full my-11 mx-auto bg-slate-100 rounded-md p-11'>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col w-full'>
						<label
							htmlFor='subject'
							className='text-xl font-bold'>
							Subject:
						</label>
						<input
							type='text'
							name='subject'
							id='subject'
							value={formState.subject}
							className='border border-gray-300 rounded-md p-2'
							disabled={!isEditing}
							onChange={handleChanges}
						/>
						<label />
						<label
							htmlFor='body'
							className='text-xl font-bold'>
							Body:
						</label>
						<textarea
							name='body'
							id='body'
							value={formState.body}
							disabled={!isEditing}
							className='border border-gray-300 rounded-md p-2 h-56'
							onChange={handleChanges}
						/>
						<div className='flex items-center justify-around w-full my-4'>
							<Link
								to='/mailers'
								className='bg-slate-500 text-white p-2 rounded-md w-1/5 text-center'>
								Back
							</Link>
							{isEditing ? (
								<button
									type='submit'
									className='bg-green-500 text-white p-2 rounded-md w-1/5'>
									Save
								</button>
							) : (
								<button
									onClick={handleEditClick}
									className='bg-blue-500 text-white p-2 rounded-md w-1/5'>
									Edit
								</button>
							)}
							<button
								className='bg-red-500 text-white p-2 rounded-md w-1/5'
								onClick={handleDeleteClick}>
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
