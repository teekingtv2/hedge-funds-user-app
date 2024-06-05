import React, { useEffect, useState } from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateOtp } from '../../utils/validate';
import { otpValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from '../../utils/helpers';
import axios from 'axios';

const VerifyEmailBody = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const initialValues = otpValues();
  const validationSchema = validateOtp();
  const history = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  const resendOTP = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user-auth/resend-verification-otp`,
      { userId }
    );
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      otp: values.otp,
      userId,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user-auth/verify-email`,
      payload
    );
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => history('/'), 3000);
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
          <div className="px-3">
            <div className="text-[24px] text-center mb-1 font-bold text-[#fff]">Verify email</div>
            <div className="text-[13px] mb-5 text-[#ffffffc9]">
              Provide the OTP earlier sent to your registred email address
            </div>
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] grid grid-cols-1 gap-8 md:grid-cols-1 w-[100%] p-2 mb-2">
                <InputField name="otp" placeholder="Enter OTP" />
              </div>
              <SubmitButton title="Verify Email" className="mt-10 w-[100%]" />
              <div className="text-[14px] md:text-[16px] text-center mt-[20px] flex justify-center gap-2">
                Didn't recive the OTP?
                <div onClick={resendOTP} className="text-[#b99dfa]">
                  Resend OTP
                </div>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailBody;
