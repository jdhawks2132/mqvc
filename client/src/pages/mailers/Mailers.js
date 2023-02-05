import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useTinyMceKeyQuery } from '../../store/mqvcAPI';
import { useMailersQuery, useCreateMailerMutation } from '../../store/mqvcAPI';

const Mailers = () => {
	const editorRef = useRef(null);

	const { data: tinyMceKey, isSuccess, isLoading } = useTinyMceKeyQuery();
	const { data: mailers, isSuccess: mailersSuccess } = useMailersQuery();
	const [createMailer, { isLoading: isCreating }] = useCreateMailerMutation();

	const [subject, setSubject] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subject !== '' && body !== '') {
			createMailer({
				subject,
				body,
			});
		}
		setSubject('');
		setBody('');
	};

	const handleBodyChange = (e) => {
		setBody(e.target.getContent());
	};

	return (
		<div className='p-11'>
			<h2 className='text-2xl font-bold my-4'>Existing Mailers:</h2>
			<div className='flex flex-col gap-4'>
				{mailersSuccess &&
					mailers?.map((mailer) => (
						// style like cards with tailwindcss
						<Link
							to={`/mailers/${mailer.id}`}
							key={mailer.id}
							className='flex bg-slate-100 m-4 p-4 rounded-md shadow-sm'>
							<h2 className='text-xl font-bold border-x mr-4 pr-4'>
								{mailer.subject}
							</h2>
							<p>{mailer.body.slice(0, 100) + '...'}</p>
						</Link>
					))}
			</div>
			{isLoading && <div>Loading...</div>}
			{tinyMceKey && isSuccess && (
				<div>
					<h2 className='text-2xl font-bold my-4'>Create a Mailer:</h2>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-4'>
						<label
							htmlFor='subject'
							className='text-xl font-bold'>
							Subject
						</label>

						<input
							className='border border-gray-300 rounded-md p-2'
							type='text'
							name='subject'
							id='subject'
							placeholder='Subject'
							value={subject}
							required
							onChange={(e) => setSubject(e.target.value)}
						/>
						<label
							htmlFor='body'
							className='text-xl font-bold'>
							Body
						</label>

						<Editor
							apiKey={tinyMceKey.value}
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue='<p>Create your email body here!</p>'
							init={{
								plugins: [
									'advlist autolink lists link charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime table paste code help wordcount',
								],
								toolbar:
									'undo redo | formatselect | ' +
									'bold italic backcolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'removeformat | help',
							}}
							style={{ height: '500px' }}
							height='500px'
							onChange={handleBodyChange}
						/>
						<button className='bg-blue-500 text-white rounded-md p-2 w-1/2 hover:bg-blue-600'>
							Submit
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Mailers;
