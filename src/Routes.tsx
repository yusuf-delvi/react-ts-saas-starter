import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import NotFound from './components/ui/NotFound';

type AppRoute = {
	path: string;
	element: React.ReactNode;
	protected?: boolean;
};
export const routes: AppRoute[] = [
	{
		path: '/',
		element: <DashboardPage />,
		protected: true,
	},
	{
		path: '/signup',
		element: <SignUpPage />,
		protected: false,
	},
	{
		path: '/signin',
		element: <SignInPage />,
		protected: false,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

const AppRoutes: React.FC = () => {
	const renderRoutes = (routes: AppRoute[]) => {
		return routes.map((route) => {
			if (route.protected) {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={<ProtectedRoute />}
					>
						<Route index element={route.element} />
					</Route>
				);
			} else {
				return (
					<Route key={route.path} path={route.path} element={route.element} />
				);
			}
		});
	};

	return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
