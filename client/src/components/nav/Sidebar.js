import React from 'react';
import MegLogo from '../../assets/images/pngs/MegQ.png';
import UserIcon from '../../assets/images/svgs/icons/user.svg';
import { Link } from 'react-router-dom';

const Sidebar = ({ currentUser }) => {
	return (
		<div className='w-72 min-w-72 bg-gray-800 h-screen'>
			<div className='flex flex-col items-center justify-center h-20 bg-gray-900'>
				<div className='flex items-center'>
					<div className='flex-shrink-0'>
						<img className='h-8 w-8' src={MegLogo} alt='Workflow logo' />
					</div>
					<div className='ml-3'>
						<div className='text-base font-medium text-white'>VendorFlow</div>
						<div className='text-sm font-medium text-gray-400'>
							MQVC Vendor Management
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center my-11'>
				<h2 className='text-white text-2xl'>
					Hi, {currentUser ? currentUser.first_name : 'Guest'}!
				</h2>
				<div className='flex items-center text-white'>
					<Link to='/user-profile'>
						<img
							className='h-10 w-10 rounded-full mt-2'
							src={UserIcon}
							alt='User Icon'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
