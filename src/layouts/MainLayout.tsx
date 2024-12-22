import React, { useEffect, useState } from 'react';
import SideBar from '@/features/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { routes } from '../Routes';
import Dialog from '@/components/ui/Dialog';
import Settings from '@/features/settings/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateIsSettingsOpen } from '@/features/settings/settingsSlice';
import { hideError } from '@/features/error/errorSlice';
import ErrorAlert from '@/features/error/Error';
import menu from '../assets/Icons/menu.png';
interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { open, message } = useSelector((state: any) => state.error);
	const [sidebar, setSidebar] = useState(false);

	const noSideBarRoutes = ['/signup', '/signin'];
	const location = useLocation();
	const isSettingsOpen = useSelector(
		(state: RootState) => state.settings.isSettingsOpen
	);

	const dispatch = useDispatch();

	const shouldDisplaySideBar = () => {
		const currentPath = location.pathname;

		const isNoSideBarRoute = noSideBarRoutes.some((route) => {
			return currentPath === route || currentPath.startsWith(route + '/');
		});

		if (isNoSideBarRoute) {
			return false;
		}

		const isMatchedRoute = routes.some((routeObj) => {
			const routePath = routeObj.path;
			if (routePath.includes('/:')) {
				const baseRoute = routePath.split('/:')[0];
				return (
					currentPath === baseRoute || currentPath.startsWith(baseRoute + '/')
				);
			} else if (routePath.includes(':')) {
				const baseRoute = routePath.split('/:')[0];
				return currentPath.startsWith(baseRoute);
			}
			return currentPath === routePath;
		});
		return isMatchedRoute;
	};

	const handleClose = () => {
		dispatch(hideError());
	};

	useEffect(() => {
		if (open) {
			const timeout = setTimeout(() => {
				handleClose();
			}, 10000);
			return () => clearTimeout(timeout);
		}
	}, [open]);

	return (
		<>
			<div className='justify-between desktop:hidden laptop:hidden ta h-full '>
				{!sidebar && shouldDisplaySideBar() && (
					<div className='p-4 flex flex-row w-full justify-between'>
						<div className='flex justify-between w-full '>
							<div className='flex flex-row items-center gap-2'>
								<span className='font-medium'>SAAS Starter</span>
							</div>
							<button onClick={() => setSidebar(!sidebar)}>
								<img
									src={menu}
									className='w-8 h-8 cursor-pointer select-none mr-2'
									alt='Menu'
								/>
							</button>
						</div>
					</div>
				)}
				{sidebar && shouldDisplaySideBar() && (
					<div className='min-w-[300px] h-full z-50 fixed bg-white'>
						<SideBar
							onClose={() => {
								setSidebar(!sidebar);
							}}
						/>
					</div>
				)}
			</div>
			<div className='w-full flex flex-row '>
				{shouldDisplaySideBar() && (
					<div className='min-w-[300px] h-full mobile:hidden tablet:hidden fixed z-50'>
						<SideBar />
					</div>
				)}
				<main
					className={`${
						shouldDisplaySideBar()
							? 'flex-grow mobile:ml-0 tablet:ml-0  ml-[300px] flex justify-center bg-[#F0EEEE] min-h-screen'
							: 'flex-grow mobile:ml-0 tablet:ml-0  flex justify-center  min-h-screen'
					}`}
				>
					<div className='w-full laptop:w-full tablet:w-full mobile:w-full max-w-full h-full'>
						<div className='relative h-full'>{children}</div>
					</div>
				</main>
				<Dialog
					width={1140}
					isPx
					height={680}
					open={isSettingsOpen}
					onClose={() => {
						dispatch(updateIsSettingsOpen({ isSettingsOpen: false }));
					}}
				>
					<Settings />
				</Dialog>
				{open && (
					<div className='fixed top-[1.5rem] right-6 mobile:right-5 mobile:top-5 tablet:top-10 tablet:right-10 z-50'>
						<ErrorAlert message={message} onClose={handleClose} />
					</div>
				)}
			</div>
		</>
	);
};

export default MainLayout;
