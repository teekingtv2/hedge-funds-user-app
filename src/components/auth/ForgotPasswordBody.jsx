import React from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateForgotPassword } from '../../utils/validate';
import { forgotPasswordValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link } from 'react-router-dom';
import { errorNotification, successNotification } from '../../utils/helpers';
import axios from 'axios';

const ForgotPasswordBody = () => {
  const initialValues = forgotPasswordValues();
  const validationSchema = validateForgotPassword();

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user-auth/forgot-password`, {
      email: values.email,
    });
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

  return (
    <>
      <div className="w-[100%] mx-auto">
        <div className="px-2 md:px-10 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="px-3">
            <div className="text-[24px] text-center mb-1 font-bold text-[#fff]">
              Forgot password?
            </div>
            <div className="text-[13px] mb-5 text-[#ffffffc9]">
              Provide account email to receive password reset link
            </div>
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] grid grid-cols-1 gap-8 md:grid-cols-1 w-[100%] p-2 mb-2">
                <InputField name="email" placeholder="Account email address" />
              </div>
              <SubmitButton title="Password Reset" className="mt-10 w-[100%]" />
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

export default ForgotPasswordBody;
