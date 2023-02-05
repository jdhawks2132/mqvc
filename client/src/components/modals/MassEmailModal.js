import React from 'react';

const MassEmailModal = ({
	selectedMailer,
	handleMailerChange,
	handleToggleModal,
	handleSendMailers,
	mailerOptions,
	selectedVendors,
}) => {
	return (
		<div
			className='mass-mailer-modal 
    fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex items-center justify-center'>
			<div className='flex flex-col items-center bg-slate-100 p-11'>
				<h2 className='text-2xl'>Mass Email</h2>
				<div className='flex flex-col items-center'>
					<label
						className='mt-4'
						htmlFor='subject'>
						Subject
					</label>
					<select
						className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
						value={selectedMailer}
						onChange={handleMailerChange}>
						<option value=''>Select Subject</option>
						{mailerOptions.map((option) => (
							<option
								key={option.id}
								value={option.id}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				{selectedMailer !== '' && (
					<p>
						You will send this email to {selectedVendors.length}{' '}
						{selectedVendors.length === 1 ? 'vendor' : 'vendors'}
					</p>
				)}
				<div className='flex flex-row justify-center mt-4'>
					<button
						className='bg-green-500 text-white py-1 px-2 rounded hover:bg-green-800'
						onClick={handleSendMailers}>
						Send
					</button>
					<button
						className='ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-800'
						onClick={handleToggleModal}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default MassEmailModal;
