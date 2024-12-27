// React Skelaton
import Button from '@/components/common/Button';
import React, { useCallback, useEffect, useRef } from 'react';
import { useResendOtpMutation } from '@/api/signup.api';
import { useVerifyResetPasswordOtpMutation } from '@/api/signin.api';
import { useSelector, useDispatch } from 'react-redux';
import { updateSetPasswordForm } from '../../store/slices/setPasswordFormSlice';
import OtpTimer from '@/components/ui/Timer';

export const backButtonSvg = (
	<svg
		width='119'
		height='20'
		viewBox='0 0 119 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<g clip-path='url(#clip0_3630_85831)'>
			<path
				d='M15.8346 9.99984H4.16797M4.16797 9.99984L10.0013 15.8332M4.16797 9.99984L10.0013 4.1665'
				stroke='#475467'
				strokeWidth='1.66667'
			/>
			<path
				d='M29.0043 15V4.81818H32.902C33.6378 4.81818 34.2493 4.93419 34.7365 5.16619C35.227 5.39489 35.5933 5.7081 35.8352 6.10582C36.0805 6.50355 36.2031 6.95431 36.2031 7.4581C36.2031 7.8724 36.1236 8.22704 35.9645 8.52202C35.8054 8.81368 35.5916 9.05066 35.3232 9.23295C35.0547 9.41525 34.7547 9.54616 34.4233 9.62571V9.72514C34.7846 9.74503 35.1309 9.85606 35.4624 10.0582C35.7971 10.2571 36.0705 10.5388 36.2827 10.9034C36.4948 11.268 36.6009 11.7088 36.6009 12.2259C36.6009 12.7528 36.4732 13.2268 36.218 13.6477C35.9628 14.0653 35.5784 14.3951 35.0646 14.6371C34.5509 14.879 33.9046 15 33.1257 15H29.0043ZM30.8487 13.4588H32.8324C33.5019 13.4588 33.9841 13.3312 34.2791 13.076C34.5774 12.8175 34.7266 12.486 34.7266 12.0817C34.7266 11.7801 34.652 11.5083 34.5028 11.2663C34.3537 11.0211 34.1416 10.8288 33.8665 10.6896C33.5914 10.5471 33.2633 10.4759 32.8821 10.4759H30.8487V13.4588ZM30.8487 9.14844H32.6733C32.9915 9.14844 33.2782 9.09044 33.5334 8.97443C33.7886 8.85511 33.9891 8.68774 34.1349 8.4723C34.2841 8.25355 34.3587 7.99503 34.3587 7.69673C34.3587 7.30232 34.2195 6.97751 33.9411 6.7223C33.666 6.46709 33.2566 6.33949 32.7131 6.33949H30.8487V9.14844ZM40.3233 15.1541C39.8394 15.1541 39.4036 15.0679 39.0158 14.8956C38.6313 14.7199 38.3264 14.4614 38.101 14.12C37.879 13.7786 37.7679 13.3577 37.7679 12.8572C37.7679 12.4264 37.8475 12.0701 38.0066 11.7884C38.1657 11.5066 38.3828 11.2812 38.6578 11.1122C38.9329 10.9432 39.2428 10.8156 39.5875 10.7294C39.9355 10.6399 40.2952 10.5753 40.6664 10.5355C41.1138 10.4891 41.4767 10.4477 41.7551 10.4112C42.0336 10.3714 42.2357 10.3118 42.3617 10.2322C42.4909 10.1494 42.5556 10.0218 42.5556 9.84943V9.8196C42.5556 9.44508 42.4445 9.15507 42.2225 8.94957C42.0004 8.74408 41.6806 8.64134 41.263 8.64134C40.8221 8.64134 40.4725 8.73745 40.214 8.92969C39.9587 9.12192 39.7864 9.34896 39.6969 9.6108L38.0165 9.37216C38.1491 8.90814 38.3678 8.52036 38.6728 8.20881C38.9777 7.89394 39.3506 7.65862 39.7914 7.50284C40.2322 7.34375 40.7194 7.2642 41.253 7.2642C41.6209 7.2642 41.9872 7.30729 42.3517 7.39347C42.7163 7.47964 43.0494 7.62216 43.351 7.82102C43.6526 8.01657 43.8946 8.28338 44.0769 8.62145C44.2625 8.95952 44.3553 9.3821 44.3553 9.8892V15H42.6252V13.951H42.5655C42.4561 14.1631 42.302 14.362 42.1032 14.5476C41.9076 14.7299 41.6607 14.8774 41.3624 14.9901C41.0674 15.0994 40.7211 15.1541 40.3233 15.1541ZM40.7907 13.8317C41.1519 13.8317 41.4651 13.7604 41.7303 13.6179C41.9954 13.4721 42.1993 13.2798 42.3418 13.0412C42.4876 12.8026 42.5605 12.5424 42.5605 12.2607V11.3608C42.5042 11.4072 42.4081 11.4503 42.2722 11.4901C42.1396 11.5298 41.9905 11.5646 41.8248 11.5945C41.659 11.6243 41.495 11.6508 41.3326 11.674C41.1702 11.6972 41.0293 11.7171 40.91 11.7337C40.6415 11.7701 40.4012 11.8298 40.1891 11.9126C39.977 11.9955 39.8096 12.1115 39.687 12.2607C39.5643 12.4065 39.503 12.5954 39.503 12.8274C39.503 13.1589 39.624 13.4091 39.8659 13.5781C40.1079 13.7472 40.4161 13.8317 40.7907 13.8317ZM49.4959 15.1491C48.7336 15.1491 48.079 14.9818 47.5321 14.647C46.9886 14.3123 46.5693 13.8499 46.2743 13.2599C45.9827 12.6667 45.8368 11.9839 45.8368 11.2116C45.8368 10.4361 45.986 9.75166 46.2843 9.15838C46.5826 8.56179 47.0035 8.09777 47.5471 7.76633C48.0939 7.43158 48.7402 7.2642 49.486 7.2642C50.1058 7.2642 50.6543 7.37855 51.1316 7.60724C51.6122 7.83262 51.995 8.15246 52.28 8.56676C52.565 8.97775 52.7275 9.45833 52.7672 10.0085H51.0471C50.9775 9.64062 50.8117 9.33404 50.5499 9.08878C50.2914 8.8402 49.945 8.71591 49.5108 8.71591C49.1429 8.71591 48.8198 8.81534 48.5414 9.0142C48.263 9.20975 48.0459 9.49148 47.8901 9.85938C47.7376 10.2273 47.6614 10.6681 47.6614 11.1818C47.6614 11.7022 47.7376 12.1496 47.8901 12.5241C48.0426 12.8954 48.2563 13.1821 48.5314 13.3842C48.8098 13.5831 49.1363 13.6825 49.5108 13.6825C49.776 13.6825 50.013 13.6328 50.2218 13.5334C50.4339 13.4306 50.6112 13.2831 50.7537 13.0909C50.8962 12.8987 50.994 12.665 51.0471 12.3899H52.7672C52.7241 12.9302 52.565 13.4091 52.29 13.8267C52.0149 14.241 51.6403 14.5658 51.1664 14.8011C50.6924 15.0331 50.1356 15.1491 49.4959 15.1491ZM55.8857 12.6037L55.8807 10.4311H56.169L58.9134 7.36364H61.0163L57.6406 11.1222H57.2678L55.8857 12.6037ZM54.245 15V4.81818H56.0447V15H54.245ZM59.0376 15L56.5518 11.5249L57.7649 10.2571L61.1903 15H59.0376ZM69.5016 7.36364V8.75568H65.1117V7.36364H69.5016ZM66.1955 5.53409H67.9952V12.7031C67.9952 12.9451 68.0317 13.1307 68.1046 13.2599C68.1808 13.3859 68.2802 13.4721 68.4029 13.5185C68.5255 13.5649 68.6614 13.5881 68.8105 13.5881C68.9232 13.5881 69.026 13.5798 69.1188 13.5632C69.2149 13.5466 69.2878 13.5317 69.3375 13.5185L69.6408 14.9254C69.5447 14.9586 69.4071 14.995 69.2282 15.0348C69.0525 15.0746 68.8371 15.0978 68.5819 15.1044C68.1311 15.1177 67.7251 15.0497 67.3638 14.9006C67.0025 14.7481 66.7158 14.5128 66.5037 14.1946C66.2949 13.8764 66.1922 13.4787 66.1955 13.0014V5.53409ZM74.2557 15.1491C73.5099 15.1491 72.8636 14.9851 72.3168 14.657C71.7699 14.3288 71.3456 13.8698 71.044 13.2798C70.7457 12.6899 70.5966 12.0005 70.5966 11.2116C70.5966 10.4228 70.7457 9.73177 71.044 9.13849C71.3456 8.54522 71.7699 8.08452 72.3168 7.75639C72.8636 7.42827 73.5099 7.2642 74.2557 7.2642C75.0014 7.2642 75.6477 7.42827 76.1946 7.75639C76.7415 8.08452 77.1641 8.54522 77.4624 9.13849C77.764 9.73177 77.9148 10.4228 77.9148 11.2116C77.9148 12.0005 77.764 12.6899 77.4624 13.2798C77.1641 13.8698 76.7415 14.3288 76.1946 14.657C75.6477 14.9851 75.0014 15.1491 74.2557 15.1491ZM74.2656 13.7074C74.67 13.7074 75.008 13.5964 75.2798 13.3743C75.5516 13.1489 75.7538 12.8473 75.8864 12.4695C76.0223 12.0916 76.0902 11.6707 76.0902 11.2067C76.0902 10.7393 76.0223 10.3168 75.8864 9.93892C75.7538 9.55777 75.5516 9.2545 75.2798 9.02912C75.008 8.80374 74.67 8.69105 74.2656 8.69105C73.8513 8.69105 73.5066 8.80374 73.2315 9.02912C72.9598 9.2545 72.7559 9.55777 72.62 9.93892C72.4875 10.3168 72.4212 10.7393 72.4212 11.2067C72.4212 11.6707 72.4875 12.0916 72.62 12.4695C72.7559 12.8473 72.9598 13.1489 73.2315 13.3743C73.5066 13.5964 73.8513 13.7074 74.2656 13.7074ZM84.7147 4.81818V15H82.915V4.81818H84.7147ZM89.8963 15.1491C89.1506 15.1491 88.5043 14.9851 87.9574 14.657C87.4105 14.3288 86.9863 13.8698 86.6847 13.2798C86.3864 12.6899 86.2372 12.0005 86.2372 11.2116C86.2372 10.4228 86.3864 9.73177 86.6847 9.13849C86.9863 8.54522 87.4105 8.08452 87.9574 7.75639C88.5043 7.42827 89.1506 7.2642 89.8963 7.2642C90.642 7.2642 91.2884 7.42827 91.8352 7.75639C92.3821 8.08452 92.8047 8.54522 93.103 9.13849C93.4046 9.73177 93.5554 10.4228 93.5554 11.2116C93.5554 12.0005 93.4046 12.6899 93.103 13.2798C92.8047 13.8698 92.3821 14.3288 91.8352 14.657C91.2884 14.9851 90.642 15.1491 89.8963 15.1491ZM89.9062 13.7074C90.3106 13.7074 90.6487 13.5964 90.9205 13.3743C91.1922 13.1489 91.3944 12.8473 91.527 12.4695C91.6629 12.0916 91.7308 11.6707 91.7308 11.2067C91.7308 10.7393 91.6629 10.3168 91.527 9.93892C91.3944 9.55777 91.1922 9.2545 90.9205 9.02912C90.6487 8.80374 90.3106 8.69105 89.9062 8.69105C89.492 8.69105 89.1473 8.80374 88.8722 9.02912C88.6004 9.2545 88.3965 9.55777 88.2607 9.93892C88.1281 10.3168 88.0618 10.7393 88.0618 11.2067C88.0618 11.6707 88.1281 12.0916 88.2607 12.4695C88.3965 12.8473 88.6004 13.1489 88.8722 13.3743C89.1473 13.5964 89.492 13.7074 89.9062 13.7074ZM98.4039 18.0227C97.7576 18.0227 97.2025 17.9349 96.7385 17.7592C96.2744 17.5869 95.9016 17.3549 95.6199 17.0632C95.3381 16.7715 95.1426 16.4484 95.0332 16.0938L96.6539 15.701C96.7269 15.8501 96.8329 15.9976 96.9721 16.1435C97.1113 16.2926 97.2986 16.4152 97.5339 16.5114C97.7725 16.6108 98.0725 16.6605 98.4338 16.6605C98.9442 16.6605 99.3668 16.5362 99.7015 16.2876C100.036 16.0424 100.204 15.638 100.204 15.0746V13.6278H100.114C100.021 13.8134 99.8855 14.004 99.7065 14.1996C99.5308 14.3951 99.2972 14.5592 99.0055 14.6918C98.7172 14.8243 98.3542 14.8906 97.9167 14.8906C97.3301 14.8906 96.7981 14.7531 96.3208 14.478C95.8469 14.1996 95.469 13.7853 95.1873 13.2351C94.9089 12.6816 94.7697 11.9889 94.7697 11.157C94.7697 10.3184 94.9089 9.6108 95.1873 9.03409C95.469 8.45407 95.8485 8.01491 96.3258 7.71662C96.8031 7.41501 97.335 7.2642 97.9217 7.2642C98.3691 7.2642 98.737 7.34044 99.0254 7.4929C99.3171 7.64205 99.5491 7.82268 99.7214 8.0348C99.8938 8.24361 100.025 8.44081 100.114 8.62642H100.214V7.36364H101.988V15.1243C101.988 15.7772 101.833 16.3175 101.521 16.745C101.21 17.1726 100.784 17.4924 100.243 17.7045C99.7032 17.9167 99.09 18.0227 98.4039 18.0227ZM98.4189 13.4787C98.8 13.4787 99.1248 13.3859 99.3933 13.2003C99.6618 13.0147 99.8656 12.7479 100.005 12.3999C100.144 12.0518 100.214 11.6342 100.214 11.147C100.214 10.6664 100.144 10.2455 100.005 9.88423C99.8689 9.52296 99.6667 9.2429 99.3983 9.04403C99.1331 8.84186 98.8066 8.74077 98.4189 8.74077C98.0178 8.74077 97.6831 8.84517 97.4146 9.05398C97.1461 9.26278 96.944 9.54948 96.8081 9.91406C96.6722 10.2753 96.6042 10.6863 96.6042 11.147C96.6042 11.6143 96.6722 12.0237 96.8081 12.375C96.9473 12.723 97.1511 12.9948 97.4196 13.1903C97.6913 13.3826 98.0244 13.4787 98.4189 13.4787ZM107.306 15V7.36364H109.105V15H107.306ZM108.21 6.27983C107.925 6.27983 107.68 6.18537 107.475 5.99645C107.269 5.80421 107.166 5.57386 107.166 5.3054C107.166 5.03362 107.269 4.80327 107.475 4.61435C107.68 4.42211 107.925 4.32599 108.21 4.32599C108.499 4.32599 108.744 4.42211 108.946 4.61435C109.152 4.80327 109.254 5.03362 109.254 5.3054C109.254 5.57386 109.152 5.80421 108.946 5.99645C108.744 6.18537 108.499 6.27983 108.21 6.27983ZM112.756 10.5256V15H110.956V7.36364H112.676V8.66122H112.766C112.941 8.23366 113.221 7.89394 113.606 7.64205C113.994 7.39015 114.473 7.2642 115.043 7.2642C115.57 7.2642 116.029 7.37689 116.42 7.60227C116.814 7.82765 117.119 8.15412 117.335 8.58168C117.553 9.00923 117.661 9.52794 117.658 10.1378V15H115.858V10.4162C115.858 9.90578 115.725 9.50639 115.46 9.21804C115.198 8.92969 114.835 8.78551 114.371 8.78551C114.057 8.78551 113.777 8.85511 113.531 8.99432C113.289 9.13021 113.099 9.32741 112.96 9.58594C112.824 9.84446 112.756 10.1577 112.756 10.5256Z'
				fill='#475467'
			/>
		</g>
		<defs>
			<clipPath id='clip0_3630_85831'>
				<rect width='119' height='20' fill='white' />
			</clipPath>
		</defs>
	</svg>
);
interface Props {
	handleStep: (value: number) => void;
	userId?: string;
	email?: string;
	step: number;
}

const LoginOtpForm: React.FC<Props> = ({ step, handleStep }) => {
	const [otp, setOtp] = React.useState<{
		otp1: string;
		otp2: string;
		otp3: string;
		otp4: string;
	}>({ otp1: '', otp2: '', otp3: '', otp4: '' });
	const [errorMssg, setErrorMssg] = React.useState<string>('');
	const [isOtpMssgResend, setIsOtpMssgResend] = React.useState<boolean>(false);
	const [isResendDisabled, setIsResendDisabled] = React.useState(true);

	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	const email = useSelector(
		(state: any) => state.setPasswordForm.setPasswordFormData.email
	);

	const dispatch = useDispatch();
	const [verifyOtpMutation, { isSuccess, isError, error }] =
		useVerifyResetPasswordOtpMutation();

	const [resendOtpMutation, { isSuccess: otpResendFlag }] =
		useResendOtpMutation();

	const resendOtp = useCallback(() => {
		resendOtpMutation({ email: email });
		setIsResendDisabled(true);
	}, [email, resendOtpMutation]);

	const handleTimerComplete = () => {
		setIsResendDisabled(false);
	};

	const handleInputChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setErrorMssg('');
		const { value, id } = e.target;
		const numericValue = parseInt(value, 10); // Parse the input value as an integer
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 9) {
			inputRefs.current[index + 1]?.focus(); // Focus the next input
			setOtp({ ...otp, [id]: value });
		} else {
			setOtp({ ...otp, [id]: '' }); // Clear the value if it's not a number between 1 and 9
		}
	};
	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Backspace' && e.currentTarget.value === '') {
			const previousIndex = index - 1;
			if (previousIndex >= 0 && inputRefs.current[previousIndex]) {
				inputRefs?.current[previousIndex]?.focus();
			}
		}
	};

	const handleOtpSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (Object.values(otp).join('').length < 4)
			return setErrorMssg('Please enter a valid OTP');

		dispatch(
			updateSetPasswordForm({
				email: email,
				otp: Object.values(otp).join(''),
			})
		);
		verifyOtpMutation({ email: email, otp: Object.values(otp).join('') });
	};

	{
		useEffect(() => {
			if (isSuccess) {
				handleStep(step + 1);
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
			if (otpResendFlag) {
				setIsOtpMssgResend(true);
			}
		}, [isSuccess, isError, otpResendFlag]);

		return (
			<div className='  w-[360px] '>
				<div
					className='cursor-pointer w-[120px]'
					onClick={() => handleStep(step - 2)}
				>
					{backButtonSvg}
				</div>
				<div className=' mt-8'>
					<h1 className=' text-3xl font-semibold mb-3'>Check your email</h1>
					<span>
						{`${
							isOtpMssgResend
								? 'We resent a password reset link to '
								: 'We sent a password reset link to '
						}`}
					</span>
					<span className=' text-primary'>{email}</span>
				</div>
				<div>
					<form onSubmit={handleOtpSubmit}>
						<div className='flex w-full space-x-3 mt-6'>
							<div className=' flex flex-col'>
								<input
									id='otp1'
									ref={(ref) => (inputRefs.current[0] = ref)}
									className={` w-20 h-20 px-2 py-[10px] border-2 ${
										errorMssg
											? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
											: 'text-primary border-primary focus:ring-blue-200 '
									}  text-center text-5xl   rounded-lg focus:ring-4 `}
									type='text'
									maxLength={1}
									value={otp.otp1}
									autoComplete='off'
									onChange={(e) => handleInputChange(0, e)}
									onKeyDown={(e) => handleKeyDown(0, e)}
								/>
							</div>
							<div className=' flex flex-col'>
								<input
									id='otp2'
									ref={(ref) => (inputRefs.current[1] = ref)}
									className={` w-20 h-20 px-2 py-[10px] border-2 ${
										errorMssg
											? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
											: 'text-primary border-primary focus:ring-blue-200'
									}  text-center text-5xl   rounded-lg focus:ring-4 `}
									type='text'
									maxLength={1}
									value={otp.otp2}
									autoComplete='off'
									onChange={(e) => handleInputChange(1, e)}
									onKeyDown={(e) => handleKeyDown(1, e)}
								/>
							</div>
							<div className=' flex flex-col'>
								<input
									id='otp3'
									ref={(ref) => (inputRefs.current[2] = ref)}
									className={` w-20 h-20 px-2 py-[10px] border-2 ${
										errorMssg
											? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
											: 'text-primary border-primary focus:ring-blue-200'
									}  text-center text-5xl   rounded-lg focus:ring-4 `}
									type='text'
									maxLength={1}
									value={otp.otp3}
									autoComplete='off'
									onChange={(e) => handleInputChange(2, e)}
									onKeyDown={(e) => handleKeyDown(2, e)}
								/>
							</div>
							<div className=' flex flex-col'>
								<input
									id='otp4'
									ref={(ref) => (inputRefs.current[3] = ref)}
									className={` w-20 h-20 px-2 py-[10px] border-2 ${
										errorMssg
											? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
											: 'text-primary border-primary focus:ring-blue-200'
									}  text-center text-5xl   rounded-lg focus:ring-4 `}
									type='text'
									maxLength={1}
									value={otp.otp4}
									autoComplete='off'
									onChange={(e) => handleInputChange(3, e)}
									onKeyDown={(e) => handleKeyDown(3, e)}
								/>
							</div>
						</div>
						{errorMssg && (
							<p className=' text-red-500 text-sm mt-2'>{errorMssg}</p>
						)}
						<Button
							type='submit'
							text='Verify Email'
							className=' w-full mt-6 mb-6 focus:ring-0'
						/>
					</form>
				</div>
				<div className=' text-sm'>
					<span>Didn't receive the email?</span>
					{isResendDisabled ? (
						<OtpTimer
							initialSeconds={15}
							onTimerComplete={handleTimerComplete}
						/>
					) : (
						<button
							className=' cursor-pointer ml-1 font-semibold text-primary'
							onClick={resendOtp}
							disabled={isResendDisabled}
						>
							Click to resend
						</button>
					)}
				</div>
			</div>
		);
	}
};
export default LoginOtpForm;
