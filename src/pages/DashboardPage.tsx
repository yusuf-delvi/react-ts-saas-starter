import { Dashboard } from '@/features/dashboard';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardPage: React.FC = () => {
	const [path, setPath] = useState('');
	const location = useLocation();

	useEffect(() => {
		setPath(location.pathname);
	}, [location.pathname]);

	return (
		<div className='bg-neutral p-6 h-full'>
			<Dashboard />
		</div>
	);
};

export default DashboardPage;
