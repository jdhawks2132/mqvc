
const FlashMessage = ({
	errorMessage,
	successMessage,
	setErrorMessage,
	setSuccessMessage,
}) => {
	setTimeout(() => {
		setErrorMessage(null);
		setSuccessMessage(null);
	}, 5000);

	if (errorMessage) {
		return (
			<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4'>
				<strong className='font-bold'>Error! </strong>
				<span className='block sm:inline'>{errorMessage}</span>
			</div>
		);
	} else if (successMessage) {
		return (
			<div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4'>
				<strong className='font-bold'>Success! </strong>
				<span className='block sm:inline'>{successMessage}</span>
			</div>
		);
	}
};

export default FlashMessage;
