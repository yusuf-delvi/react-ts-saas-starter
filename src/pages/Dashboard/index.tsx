import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardPage: React.FC = () => {
	const [, setPath] = useState('');
	const location = useLocation();

	useEffect(() => {
		setPath(location.pathname);
	}, [location.pathname]);

	return (
		<div className='bg-neutral p-6 h-full'>
			<div className='flex flex-col gap-8  bg-neutral w-full h-full '>
				<h1 className='text-center'>Dashboard</h1>
			</div>
		</div>
	);
};

export default DashboardPage;
