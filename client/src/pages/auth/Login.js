import React, { useState } from 'react';

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
		<div className='container'>
			<div className='row'>
				<div className='col-md-12'>
					<h2>Login</h2>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='email'>email</label>
							<input
								type='text'
								className='form-control'
								id='email'
								placeholder='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								className='form-control'
								id='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button className='btn btn-primary'>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
