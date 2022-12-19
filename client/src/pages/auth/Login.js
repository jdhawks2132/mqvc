import React, { useState } from 'react';
import { useSignInMutation } from '../../store/mqvcAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [signIn, { error }] = useSignInMutation();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email.length > 0 && password.length > 0) {
			await signIn({ email, password });
			setEmail('');
			setPassword('');
			navigate('/dashboard');
		}
		alert('Username or password is empty');
		return;
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
						{error && <p className='alert alert-danger'>{error}</p>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
