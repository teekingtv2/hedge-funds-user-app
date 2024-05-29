import * as yup from 'yup';

export const validateLogin = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Account email is missing'),
    password: yup
      .string()
      .trim()
      .min(8, 'Password is too short')
      .required('Account password is missing'),
  });
  return validationSchema;
};

export const validateSignup = () => {
  const phoneRegExp = /^[0-9]{6,15}$/;
  const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing'),
    email: yup.string().email('Invalid email').required('Email is missing'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample (+11255678765)')
      .required('Phone number is missing'),
    wallet: yup.string().trim().required('wallet is missing'),
    network: yup.string().trim().required('Blockchain network is missing'),
    country: yup.string().trim().required('Please select your country'),
    password: yup.string().trim().min(8, 'Password is too short').required('Password is missing'),
    confirmPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateUpdateProfile = () => {
  const phoneRegExp = /^[\+][0-9]{7,15}$/;
  const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing'),
    network: yup.string().trim().required('Select blockchain network'),
    wallet: yup.string().trim().required('Wallet address is missing'),
    country: yup.string().trim().required('Please select your country'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number. Follow the sample')
      .required('Phone number is missing'),
  });
  return validationSchema;
};

export const validateUpdatePassword = () => {
  const validationSchema = yup.object({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: yup
      .string()
      .required('Account Password is required')
      .min(8, 'Password is too short'),
    confirmNewPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateForgotPassword = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Account email is missing'),
  });
  return validationSchema;
};

export const validateResetPassword = () => {
  const validationSchema = yup.object({
    password: yup.string().trim().min(8, 'Password is too short').required('Password is missing'),
    confirmPassword: yup
      .string()
      .required('Confirm Account Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return validationSchema;
};

export const validateOtp = () => {
  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .trim()
      .min(4, 'OTP is incomplete')
      .max(5, 'OTP digits cannot be more than 4 characters long')
      .required('Please provide the OTP'),
  });
  return validationSchema;
};

export const validateWithdrawal = () => {
  const validationSchema = yup.object({
    balance: yup.number().required(),
    amount: yup
      .mixed()
      .test('isLarger', 'Amount must be lower than your balance', (value, testContext) => {
        if (testContext.parent.balance <= value) return false;
        return true;
      })
      .required('How much are you withdrawing?'),
  });
  return validationSchema;
};
