import React, { useEffect, useState } from 'react';
import PricingCard from '@components/ui/PricingCard';
import {
	useCreatePortalSessionMutation,
	useUpdateSubscriptionMutation,
} from '@api/payment.api';
import { useGetProfileDetailQuery } from '@api/settings.api';
import { resetStep } from '../../store/slices/signupSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const starter = ['starter Plan'];

const professional = ['Professional Plan'];

interface Props {
	step: number;
	handleStep: (value: number) => void;
}

const PricingPlan: React.FC<Props> = () => {
	const [subscription, setSubscription] = useState<string | null>(null);
	const { data: accountDetail } = useGetProfileDetailQuery({});

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [createPortalSession, { data: paymentURL, isSuccess }] =
		useCreatePortalSessionMutation();
	const [
		updateSubscription,
		{ data: updatedSubscription, isSuccess: isSubscriptionSuccess },
	] = useUpdateSubscriptionMutation();

	const handlePayment = async (plan: 'PROFESSIONAL') => {
		if (accountDetail?.data?.isSubscriptionActive) {
			updateSubscription({
				newSubscriptionPlan: plan,
				subscriptionId: accountDetail?.data?.subscriptionId as string,
			});
		} else {
			createPortalSession({
				subscriptionPlan: plan,
			});
		}
	};

	useEffect(() => {
		if (updatedSubscription && isSubscriptionSuccess) {
			setSubscription(updatedSubscription?.data?.updateSubscriptionPlan);
		}
	}, [updatedSubscription]);

	useEffect(() => {
		if (paymentURL && paymentURL?.data && isSuccess) {
			window.location.href = paymentURL?.data;
		}
	}, [paymentURL, isSuccess]);

	useEffect(() => {
		setSubscription(accountDetail?.data?.subscription);
	}, [accountDetail]);

	return (
		<div>
			<div className='mt-[29px]'>
				<h1 className='text-base text-primary font-semibold mb-3'>Pricing</h1>
				<h1 className='text-5xl font-semibold mb-6'>Select Your Plan</h1>
				<p className='text-[20px]  text-gray-600'>
					Choose the plan that best suits your journey from idea to execution.
				</p>
			</div>
			<div className=' flex mt-[29px]  gap-x-4 mb-8'>
				<PricingCard
					primary
					heading='Starter Plan - Free'
					price={0}
					description='Starter Plan is designed to give you a generous taste of what we offer, ensuring you have the tools you need to kickstart.'
					textArray={starter}
					buttonText={'Get Started'}
					onClick={() => {
						dispatch(resetStep());
						navigate('/');
					}}
				/>
				<PricingCard
					disabled={subscription === 'PROFESSIONAL'}
					onClick={() => {
						handlePayment('PROFESSIONAL');
					}}
					active={subscription === 'PROFESSIONAL'}
					textArray={professional}
					heading='Professional'
					description='Designed for those who need more power and flexibility, this plan provides enhanced capabilities to support your growing.'
					price={10}
					buttonText={'Get Started'}
				/>
			</div>
		</div>
	);
};
export default PricingPlan;
