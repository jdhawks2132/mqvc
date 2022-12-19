import React from 'react';

const Dashboard = ({ currentUser }) => {
	return (
		<div>
			Hi, {currentUser.first_name} your admin level is:{' '}
			{currentUser.admin_level}
		</div>
	);
};

export default Dashboard;
