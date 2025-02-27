import React from 'react';
import SignInForm from './SignInForm';
import ForgetPasswordPage from './ForgetPasswordForm';
import LoginOtpForm from './LoginOtpForm';
import SetPasswordForm from './SetPasswordForm';
import PasswordResetForm from './PasswordResetForm';
import { updateStep, selectStep } from '@store/slices/signInFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export interface StepperProps {
	[key: number]: JSX.Element;
}

const headerComp = (
	<div className=' flex p-[30px] h-auto '>
		<div className=' ml-2 flex items-center'>
			<h1 className=' text-2xl font-bold'>SAAS Starter</h1>
		</div>
	</div>
);

const SignInPage: React.FC = () => {
	const step: number = useSelector(selectStep);

	const dispatch = useDispatch();

	const handleStep = (value: number) => {
		dispatch(updateStep(value));
	};

	const StepperComponents: StepperProps = {
		1: <SignInForm step={step} handleStep={handleStep} />,
		2: <ForgetPasswordPage step={step} handleStep={handleStep} />,
		3: <LoginOtpForm step={step} handleStep={handleStep} />,
		4: <SetPasswordForm step={step} handleStep={handleStep} />,
		5: <PasswordResetForm />,
	};

	return (
		<div>
			{headerComp}
			<div className='flex justify-center w-full min-h-screen '>
				<div className='w-1/2 bg-white flex flex-col justify-between mobile:w-full'>
					<div className='px-8 flex justify-center items-center'>
						<div>{StepperComponents[step]}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
