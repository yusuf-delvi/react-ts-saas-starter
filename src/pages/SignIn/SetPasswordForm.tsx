import React, { useEffect } from 'react';
import BackButton from '@assets/Icons/BackButtonIcon.svg';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useSetNewPasswordMutation } from '@api/signin.api';
import { setPasswordFormSchema } from '../../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateStep } from '../../store/slices/signInFormSlice';
import { selectSetPasswordFormData } from '@store/slices/setPasswordFormSlice';

interface Props {
	step: number;
	handleStep: (value: number) => void;
}

export const backButtonSvg = <img src={BackButton} alt='back' />;

const SetPasswordForm: React.FC<Props> = ({ step, handleStep }) => {
	const [passwords, setPasswords] = React.useState({
		password: '',
		confirmPassword: '',
	});

	const [errorMssg, setErrorMssg] = React.useState('');

	const emailandOtp = useSelector(selectSetPasswordFormData);

	const dispatch = useDispatch();
	const [setNewPasswordMutation, { isSuccess, isError, error }] =
		useSetNewPasswordMutation();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;
		setPasswords({ ...passwords, [id]: value });
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: setPasswordFormSchema
			? yupResolver(setPasswordFormSchema)
			: undefined,
		mode: 'onSubmit',
	});

	const handlePasswordSubmit = () => {
		setNewPasswordMutation({
			email: emailandOtp.email,
			otp: emailandOtp.otp,
			password: passwords.password,
			confirmPassword: passwords.confirmPassword,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			handleStep(step + 1);
		} else if (
			isError &&
			(
				error as {
					status: number;
					data: { message: string; statusCode: string };
				}
			)?.data?.message === 'OTP expired'
		) {
			dispatch(updateStep(3));
		} else if (isError) {
			console.warn(error);
			setErrorMssg(
				(
					error as {
						status: number;
						data: { message: string; statusCode: string };
					}
				)?.data?.message
			);
		}
	}, [isSuccess, isError]);

	return (
		<div className=' w-[360px] flex flex-col gap-y-8 '>
			<div
				className='cursor-pointer w-[120px]'
				onClick={() => {
					handleStep(step - 3);
				}}
			>
				{backButtonSvg}
			</div>
			<div>
				<h1 className=' text-gray-900 font-semibold text-3xl mb-3'>
					Set new password
				</h1>
				<p className=' text-gray-600 text-base'>
					Your new password must be different to previously used passwords.
				</p>
			</div>
			<div>
				<form onSubmit={handleSubmit(handlePasswordSubmit)}>
					<Input
						type='password'
						register={register}
						id='password'
						name='password'
						labelText='Enter new password'
						placeholderText='••••••••'
						className={`${
							errorMssg || errors.password?.message
								? ' text-red-500 border-red-300 bg-red-50 focus:border-red-300 focus:ring-red-300'
								: 'border-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-blue-300'
						} `}
						onChange={handleInputChange}
					/>
					{errors.password && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.password.message as string}
						</p>
					)}
					<h1 className=' text-gray-600 font-normal mb-5'>
						Must be at least 8 characters.
					</h1>
					<Input
						type='password'
						register={register}
						id='confirmPassword'
						name='confirmPassword'
						labelText='Confirm new password'
						placeholderText='••••••••'
						className={`${
							errorMssg || errors.confirmPassword?.message
								? 'mb-[5px] text-red-500 border-red-300 bg-red-50 focus:border-red-300 focus:ring-red-300'
								: ' mb-[5px] border-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-blue-300'
						} `}
						onChange={handleInputChange}
					/>
					{errors.confirmPassword && (
						<p className='text-sm mt-1 text-red-600'>
							{errors.confirmPassword.message as string}
						</p>
					)}
					<Button
						type='submit'
						text='Reset Password'
						className=' w-full mt-8'
					/>
				</form>
			</div>
		</div>
	);
};

export default SetPasswordForm;
