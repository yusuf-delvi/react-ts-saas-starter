import React, { useEffect } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';
import { signUpFormDataType } from '@store/slices/signupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useSignUpMutation } from '@api/signup.api';
import { useNavigate } from 'react-router-dom';
import { signUpFormSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogInMutation } from '@api/signup.api';
import { selectAuth, selectToken } from '@store/slices/authSlice';

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

	const authState = useSelector(selectAuth);
	const token = useSelector(selectToken);

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
