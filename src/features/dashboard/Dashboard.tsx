import React from 'react';

interface DashboardProps {
	projectType?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
	return (
		<div className='flex flex-col gap-8  bg-neutral w-full h-full '>
			<h1 className='text-center'>Dashboard</h1>
		</div>
	);
};

export default Dashboard;
