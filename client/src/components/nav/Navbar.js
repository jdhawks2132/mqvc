import React from 'react';
import { Link } from 'react-router-dom';
import { useSignOutMutation } from '../../store/mqvcAPI';

const Navbar = ({ currentUser }) => {
	const [signOut] = useSignOutMutation();

	const handleSignOut = () => {
		signOut()
			.then(() => {
				localStorage.removeItem('jwt');
				window.location.href = '/';
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<span className='font-semibold text-xl tracking-tight'>
					<Link
						to='/'
						className='text-gray-200 hover:text-white mr-4'>
						{currentUser ? 'My Vendors' : 'VendorFlow'}
					</Link>
				</span>
			</div>
			<div className='block lg:hidden'>
				<button className='flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'>
					<svg
						className='fill-current h-3 w-3'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>
			<div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
				<div className='text-sm lg:flex-grow'>
					{currentUser ? (
						<>
							<Link
								to='/contacts'
								className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'>
								Contacts (coming soon)
							</Link>
							<Link
								to='/mailers'
								className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white'>
								Mailers
							</Link>
						</>
					) : null}
				</div>
				<div>
					{currentUser ? (
						<>
							{currentUser.admin_level > 2 ? (
								<>
									<Link to='/admin'>
										<button className='inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0'>
											Admin Panel
										</button>
									</Link>
									<Link to='/create-vendor'>
										<button className='inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0'>
											Create Vendor
										</button>
									</Link>
								</>
							) : null}
							<button
								onClick={handleSignOut}
								className='inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to='/login'
								className='inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0'>
								Login
							</Link>
							<Link
								to='/signup'
								className='inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0'>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
