import React, { useEffect, useState } from 'react';
import PasswordInput from '@/components/common/PasswordInput';
import Button from '@/components/common/Button';
import { updatePasswordSchema } from '@/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUpdatePasswordMutation } from '@/api/settings.api';
import Loading from '../../assets/Icons/Loading.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const UpdatePasswordForm: React.FC = () => {
	const [passwords, setPasswords] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [errorMssg, setErrorMssg] = useState('');

	const loginType = useSelector(
		(state: RootState) => state.auth.user?.authType
	);

	const [updatePasswordMutation, { isLoading, isError, error }] =
		useUpdatePasswordMutation();

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrorMssg('');
		const { value, id } = e.target;
		setPasswords({ ...passwords, [id]: value });
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: updatePasswordSchema
			? yupResolver(updatePasswordSchema)
			: undefined,
		mode: 'onSubmit',
	});

	const handlePasswordFormSubmit = () => {
		const mutationData = {
			currentPassword: passwords.currentPassword,
			newPassword: passwords.newPassword,
			confirmPassword: passwords.confirmPassword,
		};

		updatePasswordMutation(mutationData);
	};

	useEffect(() => {
		if (isError) {
			setErrorMssg(
				(
					error as {
						status: number;
						data: { message: string; statusCode: string };
					}
				)?.data?.message
			);
			console.warn(error);
		}
	}, [isError]);
	return (
		<div
			className={`' w-full  flex flex-col gap-5 rounded-lg  bg-neutral-illustration-bg px-5 pt-6 pb min-h-[434px] ' ${
				errors ? 'max-w-[600px]' : 'max-h-[450px] max-w-[600px]'
			}`}
		>
			<h1 className=' text-lg font-semibold'>Change Password</h1>
			<form onSubmit={handleSubmit(handlePasswordFormSubmit)}>
				<div className='flex flex-col gap-5'>
					<PasswordInput
						id='currentPassword'
						name='currentPassword'
						value={passwords.currentPassword}
						disabled={loginType === 'GOOGLE'}
						register={register}
						labelText='Current Password'
						placeholderText='Password'
						onChange={handlePasswordChange}
						className={
							errorMssg || errors.currentPassword?.message
								? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
								: ' '
						}
					/>
					{errorMssg && (
						<p className=' text-red-500 text-sm mb-2'>{errorMssg}</p>
					)}
					{errors.currentPassword && (
						<p className='text-sm  text-red-600'>
							{errors.currentPassword.message as string}
						</p>
					)}
					<PasswordInput
						id='newPassword'
						name='newPassword'
						value={passwords.newPassword}
						disabled={loginType === 'GOOGLE'}
						register={register}
						labelText='New Password'
						placeholderText='Password'
						onChange={handlePasswordChange}
						className={
							errors.newPassword?.message
								? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
								: ' '
						}
					/>
					{errors.newPassword && (
						<p className='text-sm  text-red-600'>
							{errors.newPassword.message as string}
						</p>
					)}
					<PasswordInput
						id='confirmPassword'
						name='confirmPassword'
						register={register}
						value={passwords.confirmPassword}
						disabled={loginType === 'GOOGLE'}
						labelText='Confirm Password'
						placeholderText='Confirm new password'
						onChange={handlePasswordChange}
						className={
							errors.confirmPassword?.message
								? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
								: ' '
						}
					/>
					{errors.confirmPassword && (
						<p className='text-sm  text-red-600'>
							{errors.confirmPassword.message as string}
						</p>
					)}
				</div>

				<div className=' flex justify-end mt-8 mb-5'>
					<Button
						type='submit'
						text={isLoading ? 'Saving' : 'Save Changes'}
						Icon={
							isLoading ? (
								<img src={Loading} alt='loading' className=' animate-spin' />
							) : (
								''
							)
						}
						iconPosition='after'
						disabled={loginType === 'GOOGLE'}
						className=' '
					/>
				</div>
			</form>
		</div>
	);
};

export default UpdatePasswordForm;
