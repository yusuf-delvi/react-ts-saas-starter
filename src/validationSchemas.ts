import * as yup from 'yup';

export const patientDetailsSchema = yup
  .object({
    name: yup.string().required('Full name is required'),
    phoneNumber: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/(^\d{7,}$|^$)/, 'Phone number must be minimum 7 digits')
      .optional(),
    email: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .email('Invalid email')
      .optional(),
    dob: yup.date().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
  })
  .required();

export const signUpFormSchema = yup
  .object({
    name: yup.string().required('Full name is required'),
    email: yup
      .string()
      .required('Password is required')
      .transform((value) => (value === '' ? null : value))
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  })
  .required();

export const signInFormSchema = yup
  .object({
    email: yup
      .string()
      .required('Password is required')
      .transform((value) => (value === '' ? null : value))
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  })
  .required();

export const forgetPasswordFormSchema = yup
  .object({
    email: yup
      .string()
      .required('Password is required')
      .transform((value) => (value === '' ? null : value))
      .email('Invalid email')
      .required('Email is required'),
  })
  .required();

export const setPasswordFormSchema = yup
  .object({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export const otpSchema = yup.object({
  otp1: yup
    .string()
    .required('OTP 1 is required')
    .matches(/^[0-9]$/, 'Must be a digit'),
  otp2: yup
    .string()
    .required('OTP 2 is required')
    .matches(/^[0-9]$/, 'Must be a digit'),
  otp3: yup
    .string()
    .required('OTP 3 is required')
    .matches(/^[0-9]$/, 'Must be a digit'),
  otp4: yup
    .string()
    .required('OTP 4 is required')
    .matches(/^[0-9]$/, 'Must be a digit'),
});

export const accountDetailsSchema = yup
  .object({
    fullName: yup.string().required('Full name is required'),
    userName: yup.string().required('Username is required'),
  })
  .required();

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirming new password is required'),
});
