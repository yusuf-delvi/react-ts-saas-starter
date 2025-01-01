import Button from '@components/common/Button';
import React, { useCallback, useEffect, useRef } from 'react';
import { useVerifyOtpMutation, useResendOtpMutation } from '@api/signup.api';
import { useDispatch } from 'react-redux';
import { resetsignUpForm } from '@store/slices/signupSlice';
import BackButton from '@assets/Icons/BackButton.svg';
import OtpTimer from '@components/ui/Timer';

export const backButtonSvg = <img src={BackButton} alt='back' />;

interface Props {
	handleStep: (value: number) => void;
	email: string;
	step: number;
}

const OtpForm: React.FC<Props> = ({ step, handleStep, email }) => {
	const [otp, setOtp] = React.useState<{
		otp1: string;
		otp2: string;
		otp3: string;
		otp4: string;
	}>({ otp1: '', otp2: '', otp3: '', otp4: '' });
	const [errorMssg, setErrorMssg] = React.useState<string>('');
	const [isOtpMssgResend, setIsOtpMssgResend] = React.useState<boolean>(false);
	const [isResendDisabled, setIsResendDisabled] = React.useState(true);

	const [verifyOtpMutation, { isSuccess, isError, error }] =
		useVerifyOtpMutation();

	const [resendOtpMutation, { isSuccess: otpResendFlag }] =
		useResendOtpMutation();

	const resendOtp = useCallback(() => {
		resendOtpMutation({ email: email });
		setIsResendDisabled(true);
	}, [email, resendOtpMutation]);

	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	const dispatch = useDispatch();

	const handleTimerComplete = () => {
		setIsResendDisabled(false);
	};

	const handleInputChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setErrorMssg('');
		const { value, id } = e.target;
		const numericValue = parseInt(value, 10);
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 9) {
			inputRefs.current[index + 1]?.focus();
			setOtp({ ...otp, [id]: value });
		} else {
			setOtp({ ...otp, [id]: '' });
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

	const handleSignOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.values(otp).join('').length < 4)
			return setErrorMssg('Please enter a valid OTP');
		verifyOtpMutation({ email: email, otp: Object.values(otp).join('') });
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(resetsignUpForm());
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
			<div className='cursor-pointer w-[120px]' onClick={() => handleStep(1)}>
				{backButtonSvg}
			</div>
			<div className=' mt-8'>
				<h1 className=' text-3xl font-semibold mb-3'>Check your email</h1>
				<span>
					{`${
						isOtpMssgResend
							? 'We have resent a verification link to '
							: 'We sent a verification link to '
					}`}
				</span>
				<span className=' text-primary'>{email}</span>
			</div>
			<div>
				<form onSubmit={handleSignOtpSubmit}>
					<div className='flex w-full space-x-3 mt-6'>
						<div className=' flex flex-col'>
							<input
								id='otp1'
								value={otp.otp1}
								ref={(ref) => (inputRefs.current[0] = ref)}
								className={` w-20 h-20 px-2 py-[10px] border-2 ${
									errorMssg
										? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
										: 'text-primary border-primary focus:ring-blue-200 '
								}  text-center text-5xl   rounded-lg focus:ring-4 `}
								type='text'
								maxLength={1}
								autoComplete='off'
								onChange={(e) => handleInputChange(0, e)}
								onKeyDown={(e) => handleKeyDown(0, e)}
							/>
						</div>

						<div className=' flex flex-col'>
							<input
								id='otp2'
								value={otp.otp2}
								ref={(ref) => (inputRefs.current[1] = ref)}
								className={` w-20 h-20 px-2 py-[10px] border-2 ${
									errorMssg
										? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
										: 'text-primary border-primary focus:ring-blue-200'
								}  text-center text-5xl   rounded-lg focus:ring-4 `}
								type='text'
								maxLength={1}
								autoComplete='off'
								onChange={(e) => handleInputChange(1, e)}
								onKeyDown={(e) => handleKeyDown(1, e)}
							/>
						</div>
						<div className=' flex flex-col'>
							<input
								id='otp3'
								value={otp.otp3}
								ref={(ref) => (inputRefs.current[2] = ref)}
								className={` w-20 h-20 px-2 py-[10px] border-2 ${
									errorMssg
										? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
										: 'text-primary border-primary focus:ring-blue-200'
								}  text-center text-5xl   rounded-lg focus:ring-4 `}
								type='text'
								maxLength={1}
								autoComplete='off'
								onChange={(e) => handleInputChange(2, e)}
								onKeyDown={(e) => handleKeyDown(2, e)}
							/>
						</div>
						<div className=' flex flex-col'>
							<input
								id='otp4'
								value={otp.otp4}
								ref={(ref) => (inputRefs.current[3] = ref)}
								className={` w-20 h-20 px-2 py-[10px] border-2 ${
									errorMssg
										? 'text-red-500 bg-red-100 border-[#FDA29B] focus:ring-red-200 focus:border-[#FDA29B]'
										: 'text-primary border-primary focus:ring-blue-200'
								}  text-center text-5xl   rounded-lg focus:ring-4 `}
								type='text'
								maxLength={1}
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
			<div className=' text-sm flex'>
				<span>Didn't receive the email?</span>
				{isResendDisabled ? (
					<OtpTimer initialSeconds={15} onTimerComplete={handleTimerComplete} />
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
};
export default OtpForm;
