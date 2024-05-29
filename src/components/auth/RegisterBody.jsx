import React from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateSignup } from '../../utils/validate';
import { signUpValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import SelectCountryField from '../forms/SelectCountryField';
import SelectNetworkField from '../forms/SelectNetworkField';
import { errorNotification, successNotification } from '../../utils/helpers';
import axios from 'axios';

const RegisterBody = () => {
  const initialValues = signUpValues();
  const validationSchema = validateSignup();
  const history = useNavigate();

  const handleSubmit = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      wallet: values.wallet,
      network: values.network,
      country: values.country,
      phone: values.phone,
      password: values.password,
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user-auth/signup`, payload);
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(
          () =>
            history('/verify-account', {
              state: { userId: data.userId },
            }),
          3000
        );
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
        <div className="p-2 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="px-3">
            <div className="text-[24px] text-center mb-1 font-bold text-[#fff]">
              Sign up to get started
            </div>
            <div className="text-[13px] mb-5 text-[#ffffffc9]">
              Copy and paste your wallet address correct from your trust/METAMASK wallet
            </div>
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] uppercase grid grid-cols-1 gap-8 md:grid-cols-2 w-[100%] p-2 mb-2">
                <InputField name="name" placeholder="Your full name" />
                <InputField name="email" placeholder="Your email address" />
                <InputField name="wallet" placeholder="Wallet address" />
                <SelectNetworkField name="network" />
                <SelectCountryField name="country" />
                <InputField name="phone" placeholder="Phone number (with country code)" />
                <InputField name="password" placeholder="Set password" type="password" />
                <InputField name="confirmPassword" placeholder="Confirm password" type="password" />
              </div>
              <SubmitButton title="Sign up" className="mt-10 w-[100%]" />
              <div className="text-[14px] md:text-[16px] text-center mt-[20px] flex justify-center gap-2">
                Already have an account?
                <Link to="/login" className="text-[#b99dfa]">
                  Login instead
                </Link>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterBody;
