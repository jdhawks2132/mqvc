import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useCurrentUserQuery } from './store/mqvcAPI';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/nav/Navbar';
import Sidebar from './components/nav/Sidebar';

function App() {
	const { data: currentUser } = useCurrentUserQuery();

	return (
		<div className='flex'>
			<BrowserRouter>
				<Sidebar currentUser={currentUser} />
				<div className='flex-grow'>
					<Navbar currentUser={currentUser} />
					<Routes>
						<Route
							path='/'
							element={
								currentUser ? (
									<Dashboard currentUser={currentUser} />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
						<Route
							path='/login'
							element={!currentUser ? <Login /> : <Navigate to='/' />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
