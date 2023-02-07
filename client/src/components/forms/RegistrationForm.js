import { useState } from 'react';
import { useCreateRegistrationMutation } from '../../store/mqvcAPI';
import FlashMessage from '../flash/FlashMessage';

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		registration_type: '',
		registration_price: '',
		badges: '',
		tables: '',
	});

	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const [createRegistration, { error }] = useCreateRegistrationMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createRegistration(formData);
		if (error) {
			setErrorMessage(error.data.message);
		} else {
			setErrorMessage(null);
			setSuccessMessage('Registration Created');
			setFormData({
				name: '',
				registration_type: '',
				registration_price: '',
				badges: '',
				tables: '',
			});
		}
	};

	return (
		<div className='flex flex-col justify-center items-center p-2'>
			<h2 className='text-xl text-center my-4'>New Registration Form</h2>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center w-full'>
				<label
					htmlFor='name'
					className='text-sm font-medium text-gray-700 my-2'>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='Corporate Sponsor'
					required
					className='border border-gray-300 rounded-md p-2 w-11/12'
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				<label
					htmlFor='registration_type'
					className='text-sm font-medium text-gray-700 my-2'>
					Registration Type
				</label>
				<input
					type='text'
					name='registration_type'
					id='registration_type'
					placeholder='Symposium'
					required
					className='border border-gray-300 rounded-md p-2 w-11/12'
					value={formData.registration_type}
					onChange={(e) =>
						setFormData({ ...formData, registration_type: e.target.value })
					}
				/>
				<div className='flex w-11/12'>
					<div className='form-group flex flex-col justify-center items-start w-1/3'>
						<label
							htmlFor='registration_price'
							className='text-sm font-medium text-gray-700 my-2 '>
							Price $
						</label>
						<input
							type='number'
							name='registration_price'
							id='registration_price'
							required
							className='border border-gray-300 rounded-md p-2 w-11/12'
							placeholder='100.00'
							value={formData.registration_price}
							onChange={(e) =>
								setFormData({ ...formData, registration_price: e.target.value })
							}
						/>
					</div>
					<div className='form-group flex flex-col justify-center items-start  w-1/3'>
						<label
							htmlFor='badges'
							className='text-sm font-medium text-gray-700 my-2'>
							Badges
						</label>
						<input
							type='number'
							name='badges'
							id='badges'
							required
							className='border border-gray-300 rounded-md p-2 w-11/12'
							placeholder='2'
							value={formData.badges}
							onChange={(e) =>
								setFormData({ ...formData, badges: e.target.value })
							}
						/>
					</div>
					<div className='form-group flex flex-col justify-center items-start  w-1/3'>
						<label
							htmlFor='tables'
							className='text-sm font-medium text-gray-700 my-2'>
							Tables
						</label>
						<input
							type='number'
							name='tables'
							id='tables'
							required
							className='border border-gray-300 rounded-md p-2 w-11/12'
							placeholder='2'
							value={formData.tables}
							onChange={(e) =>
								setFormData({ ...formData, tables: e.target.value })
							}
						/>
					</div>
				</div>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded'>
					Submit
				</button>
			</form>
			<div className='w-11/12 flex justify-center items-center'>
				<FlashMessage
					errorMessage={errorMessage}
					successMessage={successMessage}
					setErrorMessage={setErrorMessage}
					setSuccessMessage={setSuccessMessage}
				/>
			</div>
		</div>
	);
};

export default RegistrationForm;
