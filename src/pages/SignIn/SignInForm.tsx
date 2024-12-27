import React, { useEffect } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	updateSignInForm,
	signInFormDataType,
} from '../../store/slices/signInFormSlice';
import { updateSignUpEmail } from '../../store/slices/signupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSignInMutation } from '@/api/signin.api';
import { RootState } from '../../store/store';
import { signInFormSchema } from '@/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { resetSignInForm } from '../../store/slices/signInFormSlice';
import { updateStep } from '../../store/slices/signupSlice';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogInMutation } from '@/api/signup.api';

interface Props {
	step: number;
	handleStep: (value: number) => void;
}

const SignInPage: React.FC<Props> = ({ step, handleStep }) => {
	const navigate = useNavigate();

	const authState = useSelector((state: RootState) => state.auth);
	const token = useSelector((state: RootState) => state.auth.token);
	const signInFormData: signInFormDataType = useSelector(
		(state: any) => state.signInForm.signInFormData
	);

	const dispatch = useDispatch();

	const [signInMutation, { isSuccess, isError, error }] = useSignInMutation();
	const [googleLoginMutation] = useGoogleLogInMutation();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;

		dispatch(
			updateSignInForm({ ...signInFormData, [id]: value } as signInFormDataType)
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: signInFormSchema ? yupResolver(signInFormSchema) : undefined,
		mode: 'onSubmit',
	});

	const handleLogin = () => {
		signInMutation({
			email: signInFormData.email,
			password: signInFormData.password,
		});
	};

	useEffect(() => {
		if (isSuccess || token) {
			dispatch(resetSignInForm());
			navigate('/');
		} else if (
			isError &&
			(
				error as {
					status: number;
					data: { message: string; statusCode: string };
				}
			)?.data?.message === 'User is not registered'
		) {
			dispatch(updateStep(1));
			navigate('/signup');
		} else if (
			isError &&
			(
				error as {
					status: number;
					data: { message: string; statusCode: string };
				}
			)?.data?.statusCode === '10005'
		) {
			dispatch(updateSignUpEmail(signInFormData.email));
			dispatch(updateStep(2));
			navigate('/signup');
		} else if (isError) {
			console.warn(error);
		}
	}, [isSuccess, isError, authState]);

	return (
		<div className=' w-[360px]'>
			<div className=' text-gray-900 text-3xl mb-3 font-semibold'>
				Welcome back
			</div>
			<div className=' text-gray-600 text-base'>Please enter your details.</div>
			<div className=' my-8'>
				<form onSubmit={handleSubmit(handleLogin)}>
					<Input
						id='email'
						register={register}
						name='email'
						labelText='Email'
						placeholderText='Enter your email'
						className={
							'mb-[5px]' +
							(errors.email?.message
								? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
								: 'border-gray-300 placeholder:text-gray-500 ')
						}
						onChange={handleInputChange}
					/>
					{errors.email && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.email.message as string}
						</p>
					)}
					<Input
						type='password'
						id='password'
						register={register}
						name='password'
						labelText='Password'
						placeholderText='Enter your password'
						className={
							'mb-[5px]' +
							(errors.email?.message
								? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
								: 'border-gray-300 placeholder:text-gray-500 ')
						}
						onChange={handleInputChange}
					/>
					{errors.password && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.password.message as string}
						</p>
					)}
					<div className=' flex justify-between my-6'>
						<div></div>
						<div
							className='  font-semibold text-sm text-primary cursor-pointer'
							onClick={() => handleStep(step + 1)}
						>
							Forgot password
						</div>
					</div>
					<div>
						<Button
							text='Sign In'
							type='submit'
							className=' w-full mt-6 focus:ring-0'
						/>
					</div>
				</form>
				<div className=' mt-5 scale-110 translate-x-4 '>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
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
				<div className=' mt-8 text-sm flex justify-center'>
					<span>Don't have an account?</span>
					<Link to={'/signup'} className=' ml-1 font-semibold text-primary'>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignInPage;
