import { useState } from 'react';
import { useCreateContributionMutation } from '../../store/mqvcAPI';
import FlashMessage from '../flash/FlashMessage';

const ContributionForm = () => {
	const [formData, setFormData] = useState({
		contribution_type: '',
		amount: '',
		name: '',
		dimensions: '',
	});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const [createContribution, { error }] = useCreateContributionMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createContribution(formData);
		if (error) {
			setErrorMessage(error.data.message);
		} else {
			setErrorMessage(null);
			setSuccessMessage('Contribution Created');
			setFormData({
				contribution_type: '',
				amount: '',
				name: '',
				dimensions: '',
			});
		}
	};

	return (
		<div className='flex flex-col justify-center items-center p-2'>
			<h2 className='text-xl text-center my-4'>New Contribution Form</h2>
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
					placeholder='Full Page Cover'
					required
					className='border border-gray-300 rounded-md p-2 w-11/12'
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				<label
					htmlFor='contribution_type'
					className='text-sm font-medium text-gray-700 my-2'>
					Contribution Type
				</label>
				<input
					type='text'
					name='contribution_type'
					id='contribution_type'
					placeholder='Advertisement'
					required
					className='border border-gray-300 rounded-md p-2 w-11/12'
					value={formData.contribution_type}
					onChange={(e) =>
						setFormData({ ...formData, contribution_type: e.target.value })
					}
				/>
				<div className='flex w-11/12'>
					<div className='form-group flex flex-col justify-center items-start w-1/2'>
						<label
							htmlFor='dimensions'
							className='text-sm font-medium text-gray-700 my-2'>
							Dimensions (optional)
						</label>
						<input
							type='text'
							name='dimensions'
							id='dimensions'
							placeholder='8 1/2 x 11'
							className='border border-gray-300 rounded-md p-2 w-11/12'
							value={formData.dimensions}
							onChange={(e) =>
								setFormData({ ...formData, dimensions: e.target.value })
							}
						/>
					</div>

					<div className='form-group flex flex-col justify-center items-start w-1/2'>
						<label
							htmlFor='amount'
							className='text-sm font-medium text-gray-700 my-2'>
							Amount in $
						</label>
						<input
							type='number'
							name='amount'
							id='amount'
							required
							className='border border-gray-300 rounded-md p-2 w-11/12'
							placeholder='100.00'
							value={formData.amount}
							onChange={(e) =>
								setFormData({ ...formData, amount: e.target.value })
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

export default ContributionForm;
