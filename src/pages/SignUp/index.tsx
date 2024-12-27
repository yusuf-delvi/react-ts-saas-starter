import React from 'react';
import SignUpForm from '@/pages/SignUp/SignUpForm';
import OtpForm from '@/pages/SignUp/OtpForm';
import PricingPlan from '@/pages/SignUp/PricingPlan';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateStep,
	updateSignUpForm,
	signUpFormDataType,
} from '@/store/slices/signupSlice';
import { RootState } from '@/store/store';

export interface StepperProps {
	[key: number]: JSX.Element;
}

export const headerComp = (
	<div className=' flex p-[30px] h-auto '>
		<div className=' ml-2 flex items-center'>
			<h1 className=' text-2xl font-bold'>SAAS Starter</h1>
		</div>
	</div>
);

const SignUpPage: React.FC = () => {
	const dispatch = useDispatch();

	const step: number = useSelector((state: RootState) => state.signUpForm.step);
	const signUpFormData: signUpFormDataType = useSelector(
		(state: RootState) => state.signUpForm.signUpFormData
	);

	const handleStep = (value: number) => {
		dispatch(updateStep(value));
	};

	const StepperComponents: StepperProps = {
		1: (
			<SignUpForm
				signUpFormData={signUpFormData}
				updateSignUpForm={updateSignUpForm}
				step={step}
				handleStep={handleStep}
			/>
		),
		2: (
			<OtpForm
				step={step}
				email={signUpFormData.email}
				handleStep={handleStep}
			/>
		),
		3: <PricingPlan step={step} handleStep={handleStep} />,
	};

	return (
		<div>
			{step === 3 ? (
				<div className='w-full flex flex-col h-screen '>
					{headerComp}
					<div className='flex justify-center'>{StepperComponents[3]}</div>
				</div>
			) : (
				<div>
					{headerComp}
					<div className='flex w-full justify-center min-h-screen'>
						<div className='w-1/2 bg-white mobile:w-full tablet:w-full flex flex-col justify-between'>
							<div className=''>
								<div className='h-screen-minus-207px px-8 flex justify-center items-center'>
									<div>{StepperComponents[step]}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignUpPage;
