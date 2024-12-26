import React, { useEffect } from 'react';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { Link } from 'react-router-dom';
import { signUpFormDataType } from './signUpFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSignUpMutation } from '@/api/signup.api';
import { useNavigate } from 'react-router-dom';
import { signUpFormSchema } from '@/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RootState } from '@/store/store';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogInMutation } from '@/api/signup.api';

export const googleIcon = (
	<svg
		width='25'
		height='24'
		viewBox='0 0 25 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<g clip-path='url(#clip0_3630_85789)'>
			<path
				d='M24.2643 12.2763C24.2643 11.4605 24.1982 10.6404 24.0571 9.83789H12.7383V14.4589H19.22C18.951 15.9492 18.0868 17.2676 16.8213 18.1054V21.1037H20.6883C22.9591 19.0137 24.2643 15.9272 24.2643 12.2763Z'
				fill='#4285F4'
			/>
			<path
				d='M12.7391 24.0013C15.9756 24.0013 18.705 22.9387 20.6936 21.1044L16.8266 18.106C15.7507 18.838 14.3618 19.2525 12.7435 19.2525C9.61291 19.2525 6.95849 17.1404 6.00607 14.3008H2.01562V17.3917C4.05274 21.4439 8.20192 24.0013 12.7391 24.0013Z'
				fill='#34A853'
			/>
			<path
				d='M6.00082 14.3007C5.49816 12.8103 5.49816 11.1965 6.00082 9.70618V6.61523H2.01478C0.312781 10.006 0.312781 14.0009 2.01478 17.3916L6.00082 14.3007Z'
				fill='#FBBC04'
			/>
			<path
				d='M12.7391 4.74966C14.4499 4.7232 16.1034 5.36697 17.3425 6.54867L20.7685 3.12262C18.5991 1.0855 15.7198 -0.034466 12.7391 0.000808666C8.20192 0.000808666 4.05274 2.55822 2.01562 6.61481L6.00166 9.70575C6.94967 6.86173 9.6085 4.74966 12.7391 4.74966Z'
				fill='#EA4335'
			/>
		</g>
		<defs>
			<clipPath id='clip0_3630_85789'>
				<rect width='24' height='24' fill='white' transform='translate(0.5)' />
			</clipPath>
		</defs>
	</svg>
);

interface Props {
	signUpFormData: signUpFormDataType;
	updateSignUpForm: ActionCreatorWithPayload<
		signUpFormDataType,
		'signUpForm/updateSignUpForm'
	>;
	step: number;
	handleStep: (value: number) => void;
}

const SignUpForm: React.FC<Props> = ({
	signUpFormData,
	updateSignUpForm,
	step,
	handleStep,
}) => {
	const navigate = useNavigate();
	const [signUpMutation, { isSuccess, isError, error }] = useSignUpMutation();
	const [googleLoginMutation] = useGoogleLogInMutation();
	const authState = useSelector((state: RootState) => state.auth);
	const token = useSelector((state: RootState) => state.auth.token);
	const dispatch = useDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;

		dispatch(
			updateSignUpForm({ ...signUpFormData, [id]: value } as signUpFormDataType)
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: signUpFormSchema ? yupResolver(signUpFormSchema) : undefined,
		mode: 'onSubmit',
	});

	const handleSignUp = () => {
		signUpMutation({
			name: signUpFormData.name,
			email: signUpFormData.email,
			password: signUpFormData.password,
		});
	};

	useEffect(() => {
		if (token) {
			navigate('/');
		}
		if (isSuccess) {
			handleStep(step + 1);
		} else if (
			isError &&
			(
				error as {
					status: number;
					data: { message: string; statusCode: string };
				}
			)?.data?.message === 'User is already registered'
		) {
			navigate('/signin');
		} else if (isError) {
			console.warn(error);
		}
	}, [isSuccess, isError, authState]);

	return (
		<div className='w-[360px]'>
			<div className=' text-gray-900 text-4xl mb-9 font-semibold text-center'>
				Sign up
			</div>
			<div>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<Input
						id='name'
						register={register}
						name='name'
						value={signUpFormData.name}
						labelText='Name*'
						placeholderText='Enter your name'
						className={`${
							errors?.name?.message
								? 'text-red-500 border-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600'
								: 'mb-[5px]'
						} `}
						onChange={handleInputChange}
					/>
					{errors.name && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.name.message as string}
						</p>
					)}
					<Input
						id='email'
						register={register}
						name='email'
						value={signUpFormData.email}
						labelText='Email*'
						placeholderText='Enter your email'
						className={`${
							errors?.email?.message
								? 'text-red-500 border-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600'
								: 'mb-[5px]'
						} `}
						onChange={handleInputChange}
					/>
					{errors.email && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.email.message as string}
						</p>
					)}
					<Input
						id='password'
						register={register}
						name='password'
						value={signUpFormData.password}
						labelText='Password*'
						placeholderText='Create a password'
						className={`${
							errors?.password?.message
								? 'text-red-500 border-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600'
								: 'mb-[5px]'
						} `}
						onChange={handleInputChange}
					/>
					{errors.password && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.password.message as string}
						</p>
					)}
					{signUpFormData.password.length < 8 && (
						<h1 className=' text-gray-600 font-normal'>
							Must be at least 8 characters.
						</h1>
					)}
					<Button
						text='Get Started'
						type='submit'
						className=' w-full mt-6 focus:ring-0'
					/>
				</form>
				<div className=' mt-5 scale-110 translate-x-4 '>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
							googleLoginMutation({
								token: credentialResponse.credential as string,
							});
						}}
						text='continue_with'
						onError={() => {
							console.log('Login Failed');
						}}
						logo_alignment='center'
						size='large'
						width={330}
					/>
				</div>
			</div>
			<div className=' mt-8 text-sm flex justify-center'>
				<span>Already have an account?</span>
				<Link to={'/signin'} className=' ml-1 font-semibold text-primary'>
					Log in
				</Link>
			</div>
		</div>
	);
};

export default SignUpForm;
