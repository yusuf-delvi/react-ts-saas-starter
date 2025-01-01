import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '@store/slices/authSlice';

const ProtectedRoute: React.FC = () => {
	const token = useSelector(selectToken);
	return token ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
