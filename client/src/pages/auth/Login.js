import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// use axios to sign in and save the jwt to local storage from the headers of the response
		axios
			.post('users/sign_in', { user: { email, password } })
			.then((response) => {
				localStorage.setItem('jwt', response.headers.authorization);
			})
			.catch((error) => {
				console.log('login error', error);
			})
			.finally(() => {
				window.location.reload();
			});
	};

	return (
		<div className='container mx-auto'>
			<form onSubmit={handleSubmit} className='w-1/5 m-11 mx-auto'>
				<h2 className='text-2xl my-11'>Log In:</h2>
				<div className='form-group'>
					<label
						htmlFor='email'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						email
					</label>
					<input
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						type='text'
						id='email'
						placeholder='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label
						htmlFor='password'
						className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						className='appearance-none block w-full bg-gray-100 text-gray-800 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
					Submit
				</button>
				<p className='my-2'>
					<Link to='/signup' className=''>
						No account?{' '}
						<span className='text-blue-500 font-bold'>Sign up here</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
