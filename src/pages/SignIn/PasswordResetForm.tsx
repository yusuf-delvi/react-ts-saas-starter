import Button from '@components/common/Button';
import React from 'react';
import { resetStep, resetSignInForm } from '@store/slices/signInFormSlice';
import { resetSetPasswordForm } from '@store/slices/setPasswordFormSlice';
import { useDispatch } from 'react-redux';

const successSvg = (
	<svg
		width='66'
		height='66'
		viewBox='0 0 66 66'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect x='5' y='5' width='56' height='56' rx='28' fill='#D1FADF' />
		<rect x='5' y='5' width='56' height='56' rx='28' stroke='#ECFDF3' />
		<path
			d='M27.7487 32.9999L31.2487 36.4999L38.2487 29.4999M44.6654 32.9999C44.6654 39.4432 39.442 44.6666 32.9987 44.6666C26.5554 44.6666 21.332 39.4432 21.332 32.9999C21.332 26.5566 26.5554 21.3333 32.9987 21.3333C39.442 21.3333 44.6654 26.5566 44.6654 32.9999Z'
			stroke='#5BBE79'
		/>
	</svg>
);

const PasswordResetForm: React.FC = () => {
	const dispatch = useDispatch();
	
	return (
		<div className='w-[360px] flex flex-col'>
			<div className=' mb-6'>{successSvg}</div>
			<div className='text-3xl font-semibold text-gray-900 mb-3'>
				Password reset
			</div>
			<div className=' text-gray-600 text-base leading-[24px]'>
				Your password has been successfully reset. Click below to log in
				magically.
			</div>
			<Button
				text='Continue'
				className=' mt-8'
				onClick={() => {
					dispatch(resetSignInForm());
					dispatch(resetSetPasswordForm());
					dispatch(resetStep());
				}}
			/>
		</div>
	);
};

export default PasswordResetForm;
