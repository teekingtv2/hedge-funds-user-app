import React from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateSignup } from '../../utils/validate';
import { signUpValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import SelectCountryField from '../forms/SelectCountryField';
import SelectNetworkField from '../forms/SelectNetworkField';
import { successNotification } from '../../utils/helpers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterBody = ({ userData }) => {
  const initialValues = signUpValues(userData);
  const validationSchema = validateSignup();
  const history = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    successNotification('Account successfully created');
    setTimeout(() => history('/login'), 1000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-[100%] mx-auto">
        <div className="p-2 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="text-[24px] text-center mb-5 font-bold text-[#fff]">
            Sign up to get started
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
                <Link to="/login" className="text-[#ffe6a6]">
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
