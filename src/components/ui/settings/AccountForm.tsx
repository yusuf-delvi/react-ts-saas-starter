import React, { useEffect } from 'react';
import ProfileImgUploadCard from '@/components/common/ProfileImgUploadCard';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { accountDetailsSchema } from '@/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateAccountFormData } from '../../../store/slices/accountFormSlice';
import {
	useGetProfileDetailQuery,
	useUpdateAccountMutation,
} from '@/api/settings.api';
import Loading from '@/assets/Icons/Loading.svg';

const AccountForm: React.FC = () => {
	const loginType = useSelector(
		(state: RootState) => state.auth.user?.authType
	);

	const accountFormData = useSelector(
		(state: RootState) => state.accountForm.accountFormData
	);

	const dispatch = useDispatch();

	const { data: accountDetail, refetch: refetchAccountDetail } =
		useGetProfileDetailQuery({});

	const [updateAccountMutation, { isSuccess, isLoading }] =
		useUpdateAccountMutation();

	useEffect(() => {
		if (accountDetail) {
			dispatch(
				updateAccountFormData({
					fullName: accountDetail?.data?.name,
					email: accountDetail?.data?.email,
					userName: accountDetail?.data?.userName,
					profilePicUrl: accountDetail?.data?.profilePicUrl,
				})
			);
		}
	}, [accountDetail]);

	useEffect(() => {
		if (isSuccess) {
			refetchAccountDetail();
		}
	}, [isSuccess]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: accountDetailsSchema
			? yupResolver(accountDetailsSchema)
			: undefined,
		mode: 'onSubmit',
		defaultValues: {
			fullName: '',
			userName: '',
		},
	});

	// As intial submission yup validation is not working so setting the initial values
	useEffect(() => {
		if (accountDetail) {
			reset({
				fullName: accountDetail.data.name,
				userName: accountDetail.data.userName,
			});
		}
	}, [accountDetail, reset]);

	const handleAccountFormSubmit = () => {
		const mutationData: {
			name: string;
			userName?: string;
			profilePicUrl?: string;
		} = {
			name: accountFormData.fullName,
		};

		if (accountFormData.userName !== '') {
			mutationData.userName = accountFormData.userName;
		}
		if (accountFormData.profilePicUrl !== '') {
			mutationData.profilePicUrl = accountFormData.profilePicUrl;
		}
		updateAccountMutation(mutationData);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;
		dispatch(updateAccountFormData({ ...accountFormData, [id]: value }));
	};

	return (
		<div className='p-2 flex gap-[30px]   mobile:flex-col tablet:flex-col '>
			<ProfileImgUploadCard profilePicUrl={accountFormData.profilePicUrl} />
			<div className=' w-full flex flex-col gap-5 rounded-lg  bg-neutral-illustration-bg px-5 pt-6  max-w-[600px]'>
				<h1 className='text-lg font-semibold'>Details</h1>
				<form onSubmit={handleSubmit(handleAccountFormSubmit)}>
					<div className=' w-full flex flex-col gap-5'>
						<div>
							<Input
								id='fullName'
								name='fullName'
								register={register}
								onChange={handleInputChange}
								labelText='Full Name'
								placeholderText='Enter your full name'
								disabled={loginType === 'GOOGLE'}
								value={accountFormData.fullName}
								className={
									errors.fullName?.message
										? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
										: 'border-gray-300 '
								}
							/>
							{errors.fullName && (
								<p className='text-sm mt-1 text-red-600'>
									{errors.fullName.message as string}
								</p>
							)}
						</div>
						<div>
							<Input
								id='userName'
								name='userName'
								register={register}
								disabled={loginType === 'GOOGLE'}
								onChange={handleInputChange}
								labelText='Username'
								placeholderText='Enter your username'
								value={accountFormData.userName}
								className={
									errors.userName?.message
										? 'border-red-500 bg-red-50 text-red-800 placeholder:text-red-700 focus:ring-red-600 focus:border-red-500 focus:outline-none'
										: 'border-gray-300 '
								}
							/>
							{errors.userName && (
								<p className='text-sm mt-1 text-red-600'>
									{errors.userName.message as string}
								</p>
							)}
						</div>

						<div>
							<Input
								id='email'
								name='email'
								labelText='Email'
								placeholderText='Email address'
								value={accountFormData.email}
								disabled
							/>
						</div>
					</div>
					<div className=' flex justify-end mb-5'>
						<Button
							type='submit'
							disabled={loginType === 'GOOGLE' || isLoading}
							text={isLoading ? 'Saving...' : 'Save Changes'}
							Icon={
								isLoading ? (
									<img src={Loading} alt='loading' className=' animate-spin' />
								) : (
									''
								)
							}
							iconPosition='before'
							className=' mt-8'
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
export default AccountForm;
