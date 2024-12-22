import { apiSlice } from './apiSlice';

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPortalSession: builder.mutation({
      query: (args: { subscriptionPlan: 'PROFESSIONAL' | 'PREMIUM' }) => ({
        url: `payment/create-portalsession`,
        method: 'POST',
        body: args,
      }),
    }),
    updateSubscription: builder.mutation({
      query: (args: {
        subscriptionId: string;
        newSubscriptionPlan: 'PROFESSIONAL' | 'PREMIUM';
      }) => ({
        url: `payment/update-subscription`,
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useCreatePortalSessionMutation, useUpdateSubscriptionMutation } =
  paymentApiSlice;
