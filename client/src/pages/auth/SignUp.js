import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const SignUp = () => {
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);

	const handleChange = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post('users', {
				user: {
					first_name: formState.firstName,
					last_name: formState.lastName,
					email: formState.email,
					password: formState.password,
				},
			})
			.then((response) => {
				localStorage.setItem('jwt', response.headers.authorization);
				window.location.reload();
			})
			.catch((error) => {
				setError(error.response.data.error);
			});
	};

	return (
		<div className='container mx-auto'>
			<form onSubmit={handleSubmit} className='w-4/5 md:w-1/3 m-11 mx-auto'>
				<div className='form-group'>
					<label
						htmlFor='firstName'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						First Name
					</label>
					<input
						type='text'
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						name='firstName'
						value={formState.firstName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label
						htmlFor='lastName'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						Last Name
					</label>
					<input
						type='text'
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						name='lastName'
						value={formState.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label
						htmlFor='email'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						Email
					</label>
					<input
						type='email'
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						name='email'
						value={formState.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label
						htmlFor='password'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						name='password'
						value={formState.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error && (
					<p className='text-red-500 bg-red-100 py-3 px-3 my-2 rounded'>
						{error.length > 1 ? `${error[0]} & ${error[1]}` : error[0]}
					</p>
				)}
				<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
					Submit
				</button>
				<p className='my-2'>
					<Link to='/login' className=''>
						Have an account?{' '}
						<span className='text-blue-500 font-bold'>Log in here</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
