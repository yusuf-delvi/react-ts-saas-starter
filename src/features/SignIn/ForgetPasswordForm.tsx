import React, { useEffect } from 'react';
import { backButtonSvg } from './SetPasswordForm';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSetPasswordForm,
  setPasswordFormDataType as forgetPasswordDataType,
} from './setPasswordFormSlice';
import { useResendOtpMutation as useForgetPasswordMutation } from '@/api/signUpApiSlice';
import { forgetPasswordFormSchema } from '@/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface Props {
  step: number;
  handleStep: (value: number) => void;
}

const ForgetPasswordPage: React.FC<Props> = ({ step, handleStep }) => {
  const [errorMssg, setErrorMssg] = React.useState('');

  const forgetPasswordFormData = useSelector(
    (state: any) => state.setPasswordForm.setPasswordFormData
  );

  const dispatch = useDispatch();
  const [forgetPasswordMutation, { isSuccess, isError, error }] =
    useForgetPasswordMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMssg('');
    const { value, id } = e.target;

    dispatch(
      updateSetPasswordForm({
        ...forgetPasswordMutation,
        [id]: value,
      } as forgetPasswordDataType)
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: forgetPasswordFormSchema
      ? yupResolver(forgetPasswordFormSchema)
      : undefined,
    mode: 'onSubmit',
  });

  const handleEmailSubmit = () => {
    forgetPasswordMutation({ email: forgetPasswordFormData.email });
  };

  useEffect(() => {
    if (isSuccess) {
      handleStep(step + 1);
    } else if (isError) {
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
  }, [isSuccess, isError]);

  return (
    <div className='  w-[360px] flex flex-col gap-y-8 '>
      <div
        className='w-[120px] cursor-pointer'
        onClick={() => {
          handleStep(step - 1);
        }}
      >
        {backButtonSvg}
      </div>
      <div className=''>
        <h1 className=' text-gray-900 font-semibold text-3xl mb-3'>
          Forgot password?
        </h1>
        <p className=' text-gray-600 text-base'>
          No worries, we'll send you reset instructions.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleEmailSubmit)}>
          <Input
            id='email'
            register={register}
            name='email'
            labelText='Email'
            placeholderText='Enter your email'
            className={`${
              errorMssg || errors.email?.message
                ? ' text-red-500 border-red-300 bg-red-50 focus:border-red-300 focus:ring-red-300'
                : 'border-gray-300 placeholder:text-gray-500'
            } `}
            onChange={handleInputChange}
          />
          {errorMssg && (
            <p className=' text-red-500 text-sm mb-2'>{errorMssg}</p>
          )}
          {errors.email && (
            <p className='text-sm mt-1 text-red-600'>
              {errors.email.message as string}
            </p>
          )}
          <Button type='submit' text='Sent OTP' className=' w-full mt-6' />
        </form>
      </div>
    </div>
  );
};
export default ForgetPasswordPage;
