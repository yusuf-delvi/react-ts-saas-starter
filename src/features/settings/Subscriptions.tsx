import {
	useCreatePortalSessionMutation,
	useUpdateSubscriptionMutation,
} from '@/api/paymentApiSlice';
import { useGetProfileDetailQuery } from '@/api/settingsApiSlice';
import PricingCardForSettings from '@/components/ui/PricingCardForSettings';
import React, { useEffect, useState } from 'react';

export const starter = ['Starter Plan'];

export const professional = ['Professional Plan'];

const Subscriptions: React.FC = () => {
	const [subscription, setSubscription] = useState<string | null>(null);
	const { data: accountDetail } = useGetProfileDetailQuery({});
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
		<div className=' w-full flex flex-col gap-5 rounded-lg  bg-neutral-illustration-bg px-5 pt-6 pb-5'>
			<div>
				<h1 className=' text-lg font-semibold'>Select Your Plan</h1>
				<p className=' text-sm font-normal'>
					Choose the plan that best suits your journey from idea to execution.
				</p>
			</div>

			<div className=' flex mt-[29px]  gap-x-4 '>
				<PricingCardForSettings
					disabled
					isActivePlan={subscription === 'FREE'}
					primary
					heading='Starter Plan - Free'
					price={0}
					description='Starter Plan is designed to give you a generous taste of what we offer, ensuring you have the tools you need to kickstart.'
					textArray={starter}
					buttonText={subscription === 'FREE' ? 'Selected Plan' : 'Select Plan'}
				/>
				<PricingCardForSettings
					disabled={subscription === 'PROFESSIONAL'}
					onClick={() => {
						handlePayment('PROFESSIONAL');
					}}
					isActivePlan={subscription === 'PROFESSIONAL'}
					textArray={professional}
					heading='Professional'
					description='Designed for those who need more power and flexibility, this plan provides enhanced capabilities to support your growing.'
					price={10}
					buttonText={
						subscription === 'PROFESSIONAL' ? 'Selected Plan' : 'Upgrade Plan'
					}
				/>
			</div>
		</div>
	);
};
export default Subscriptions;
