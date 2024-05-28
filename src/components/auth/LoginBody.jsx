import React from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateLogin } from '../../utils/validate';
import { loginValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from '../../utils/helpers';
import axios from 'axios';
axios.defaults.withCredentials = true;

const LoginBody = () => {
  const initialValues = loginValues();
  const validationSchema = validateLogin();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      email: values.email,
      password: values.password,
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user-auth/login`, payload);
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        if (data.message === 'Unverified email') {
          console.log(data.userId);
          errorNotification('Account not yet verified.');
          const otpRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/user-auth/resend-verification-otp`,
            { userId: data.userId }
          );
          setTimeout(() => {
            if (otpRes.status === 200) {
              const otpData = response.data;
              successNotification(
                'OTP has been sent to your email address. Provide the OTP in the next screen'
              );
              setTimeout(
                () =>
                  history('/verify-account', {
                    state: { userId: otpData.userId },
                  }),
                3000
              );
            } else {
              errorNotification(otpRes?.data?.error);
            }
          }, 2000);
        } else {
          successNotification(data.message);
          setTimeout(() => history('/'), 1500);
        }
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="w-[100%] mx-auto">
        <div className="px-2 md:px-10 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="text-[24px] text-center mb-5 font-bold text-[#fff]">
            Login to your account
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] grid grid-cols-1 gap-8 md:grid-cols-1 w-[100%] p-2 mb-2">
                <InputField name="email" placeholder="Your email address" />
                <InputField name="password" placeholder="Account password" type="password" />
                <div className="text-[14px] md:text-[16px] text-center mt-0 flex justify-end gap-2">
                  <Link to="/forgot-password" className="text-[#b99dfa] font-[300]">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <SubmitButton title="Login" className="mt-10 w-[100%]" />
              <div className="text-[14px] md:text-[16px] text-center mt-[20px] flex justify-center gap-2">
                Don't have an account yet?
                <Link to="/register" className="text-[#b99dfa]">
                  Register instead
                </Link>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginBody;
