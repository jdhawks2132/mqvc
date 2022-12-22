import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCurrentUserQuery } from './store/mqvcAPI';
import { useState, useEffect } from 'react';
import Navbar from './components/nav/Navbar';
import Sidebar from './components/nav/Sidebar';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/dashboard/Dashboard';

import VendorDetails from './pages/details/VendorDetails';
import ContactDetails from './pages/details/ContactDetails';
import CreateVendor from './pages/create/CreateVendor';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
	const [authIsReady, setAuthIsReady] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const { data: currentUser, error, isSuccess } = useCurrentUserQuery();

	useEffect(() => {
		if (isSuccess || error) {
			setAuthIsReady(true);
		}

		if (currentUser && currentUser.admin_level === 3) {
			setIsAdmin(true);
		}
	}, [isSuccess, error, currentUser]);

	return (
		<div className='flex'>
			{authIsReady && (
				<BrowserRouter>
					{currentUser && <Sidebar currentUser={currentUser} />}
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
								element={
									!currentUser ? (
										<Login currentUser={currentUser} />
									) : (
										<Navigate to='/' />
									)
								}
							/>
							<Route
								path='/signup'
								element={
									!currentUser ? (
										<SignUp currentUser={currentUser} />
									) : (
										<Navigate to='/' />
									)
								}
							/>

							<Route
								path='/vendors/:vendorId'
								element={
									currentUser ? <VendorDetails /> : <Navigate to='/login' />
								}
							/>
							<Route
								path='/create-vendor'
								element={isAdmin ? <CreateVendor /> : <Navigate to='/' />}
							/>
							<Route
								path='/contacts/:contactId'
								element={
									currentUser ? <ContactDetails /> : <Navigate to='/login' />
								}
							/>
							<Route
								path='/admin'
								element={isAdmin ? <AdminDashboard /> : <Navigate to='/' />}
							/>
						</Routes>
					</div>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
