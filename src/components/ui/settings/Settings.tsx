import React from 'react';
import UserIcon from '@/assets/Icons/UserIcon.svg';
import LockIcon from '@/assets/Icons/LockIcon.svg';
import HeartIcon from '@/assets/Icons/HeartIcon.svg';
import { StepperProps } from '@/pages/SignIn';
import AccountForm from './AccountForm';
import { useSelector, useDispatch } from 'react-redux';
import { updateStep } from '../../../store/slices/accountFormSlice';
import UpdatePasswordForm from './UpdatePasswordForm';
import Subscriptions from './Subscriptions';
import IconButton from '@/components/common/IconButton';
import CrossIcon from '@/assets/Icons/CrossIcon.svg';
import { RootState } from '@/store/store';
import { updateIsSettingsOpen } from '../../../store/slices/settingsSlice';

const Settings: React.FC = () => {
	const StepperComponents: StepperProps = {
		1: <AccountForm />,
		2: <UpdatePasswordForm />,
		3: <Subscriptions />,
	};
	const step = useSelector((state: RootState) => state.accountForm.step);
	const dispatch = useDispatch();
	return (
		<div className='w-full flex flex-col h-full  '>
			<div className='bg-neutral-secondary-white p-[24px] w-full flex justify-between items-center  '>
				<h1 className='text-xl font-semibold '> Settings</h1>
				<IconButton
					Icon={
						<img src={CrossIcon} className=' text w-4 h-4 hover:scale-105' />
					}
					className='  rounded-md bg-white  border p-2 border-gray-200 focus:ring-0 hover:scale-105 transform transition-all ease-in-out'
					onClick={() => {
						dispatch(updateIsSettingsOpen({ isSettingsOpen: false }));
					}}
				/>
			</div>
			<div className=' flex  h-[700px] overflow-y-auto'>
				<div className=' w-1/5 h-[695px] flex flex-col gap-[6px] pt-5 border-r-2 border-text-icon-[15%]  mobile:hidden tablet:w-2/5 laptopS:w-1/4 '>
					<div
						className={` 'cursor-pointer text-[#757575] text-base font-semibold   flex gap-2 px-[30px] py-[10px] hover:bg-neutral-secondary-white hover:border-r-4  -mr-[1px] hover:border-black ' ${
							step === 1 && 'bg-neutral-secondary-white border-r-4 border-black'
						}`}
						onClick={() => dispatch(updateStep(1))}
					>
						<img src={UserIcon} className='ml-1.5' />
						<h1>Account</h1>
					</div>
					<div
						className={` cursor-pointer text-[#757575] text-base font-semibold  -mr-[1px] flex gap-2 px-[30px] py-[10px] hover:bg-neutral-secondary-white hover:border-r-4 hover:border-black + ${
							step === 2 &&
							' bg-neutral-secondary-white border-r-4 border-black'
						}`}
						onClick={() => dispatch(updateStep(2))}
					>
						<img src={LockIcon} className='ml-1.5 ' />
						<h1>Password</h1>
					</div>
					<div
						className={
							`cursor-pointer text-[#757575] text-base font-semibold -mr-0.5 flex gap-2 px-[30px] py-[10px] hover:bg-neutral-secondary-white hover:border-r-4 hover:border-black ` +
							(step === 3 &&
								'bg-neutral-secondary-white border-r-4 border-black ')
						}
						onClick={() => dispatch(updateStep(3))}
					>
						<img src={HeartIcon} className='ml-1' />
						<h1>Subscriptions</h1>
					</div>
				</div>
				<div className='w-4/5 h-[620px] px-4 pt-4 mb-4 pb-4 mobile:w-full tablet:w-3/5 laptopS:w-3/4'>
					{StepperComponents[step]}
				</div>
			</div>
		</div>
	);
};

export default Settings;
