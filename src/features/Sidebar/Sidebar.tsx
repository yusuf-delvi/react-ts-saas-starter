import IconButton from '@/components/elements/IconButton';
import TopArrow from '../../assets/Icons/TopArrow.svg';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import AccountActions from './AccountActions';
import { useGetProfileDetailQuery } from '@/api/settings.api';
import { updateIsSettingsOpen } from '../settings/settingsSlice';
import { updateStep } from '../settings/accountFormSlice';
import CrossIcon from '../../assets/Icons/CrossIcon.svg';

const SideBar: React.FC<{
	onClose?: () => void;
}> = ({ onClose }) => {
	const [settingsModalOpen, setSettingsModalOpen] = useState(false);
	const dispatch = useDispatch();

	const name = useSelector((state: RootState) => state.auth.user?.name);
	const [subscription, setSubscription] = useState('FREE');

	const { data: accountDetail, refetch: refetchAccountDetail } =
		useGetProfileDetailQuery({});

	function formatName(name: string) {
		const firstWord = name?.split(' ')[0];
		return firstWord?.length > 15
			? firstWord.substring(0, 15) + '...'
			: firstWord;
	}

	useEffect(() => {
		refetchAccountDetail();
	}, []);

	useEffect(() => {
		setSubscription(accountDetail?.data?.subscription);
	}, [accountDetail]);

	return (
		<div className='items-stretch bg-white h-full w-full flex justify-between max-w-[300px] flex-col p-5 border-solid border border-r border-text-icon border-opacity-[15%] z-50'>
			<div className='flex flex-col'>
				<div className='w-full justify-between items-stretch self-stretch flex'>
					<span className='items-stretch flex justify-between gap-0 py-2 w-full'>
						<div className='flex flex-row  w-full justify-between'>
							<h1 className='text-2xl font-bold'>SAAS Starter</h1>
							<button
								className='desktop:hidden laptop:hidden'
								onClick={() => {
									onClose && onClose();
								}}
							>
								<img src={CrossIcon} className='w-8' />
							</button>
						</div>
					</span>
				</div>
				<div className='flex flex-col gap-4 z-50'></div>
				<div className='bg-gray-800 bg-opacity-10 min-h-[1px] -ml-5 w-[300px] ' />
			</div>

			<div>
				<div className='flex flex-col gap-[22px] overflow-auto w-full m-0 py-4'>
					<div className='items-stretch flex w-full flex-col'>
						{/* Container content goes here */}
						<div className=' flex flex-col overflow-auto'>
							<div className='bg-gray-800 bg-opacity-10 min-h-[1px] ' />
							<div className='w-full bg-gray-800 p-4 gap-4 rounded-lg flex flex-col mb-10 '>
								{subscription !== 'PROFESSIONAL' && (
									<button
										onClick={() => {
											dispatch(
												updateIsSettingsOpen({
													isSettingsOpen: true,
												})
											);
											dispatch(updateStep(3));
										}}
										className='px-2 py-1.5 bg-white w-full text-sm font-semibold rounded-lg text-black  hover:scale-105 transform transition-all ease-in-out'
									>
										Upgrade Now
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='fade-effect'></div>
				<div className='flex justify-between relative'>
					<div className=' flex items-center gap-3'>
						<div className=' bg-black text-white text-xl font-semibold rounded-full w-[40px] h-[40px] flex items-center justify-center'>
							{name?.charAt(0)}
						</div>
						<h1 className=' text-black font-semibold text-xl'>
							{formatName(name!)}
						</h1>
					</div>
					<IconButton
						Icon={
							<img
								loading='lazy'
								src={TopArrow}
								className='w-5 h-5 hover:scale-110 hover:-translate-y-1 '
							/>
						}
						className='focus:ring-0 bg-neutral-secondary-white p-2 hover:scale-105'
						onClick={() => {
							setSettingsModalOpen((prev) => !prev);
						}}
					/>
					{settingsModalOpen && (
						<div className=' absolute right-0 bottom-16 bg-primary rounded-lg'>
							<AccountActions setSettingsModalOpen={setSettingsModalOpen} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
