import { useEffect, useState } from 'react';

import { useCurrentUserQuery } from './store/mqvcAPI';

import Login from './pages/auth/Login';

function App() {
	const {
		data: currentUser,
		error,
		isLoading,
		isFetching,
		isSuccess,
	} = useCurrentUserQuery();

	return (
		<div className='App'>
			<h1 className='text-3xl font-bold underline'>Test</h1>
			{currentUser ? (
				<div>
					<h2 className='text-2xl font-bold underline'>
						{currentUser.first_name} {currentUser.last_name}
					</h2>
				</div>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
