import React from 'react';
import InputField from '../forms/InputField';
import CustomFormik from '../../utils/CustomFormik';
import { validateResetPassword } from '../../utils/validate';
import { resetPasswordValues } from '../../utils/initialValues';
import SubmitButton from '../forms/SubmitButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from '../../utils/helpers';
import axios from 'axios';

const ResetPasswordBody = () => {
  const initialValues = resetPasswordValues();
  const validationSchema = validateResetPassword();
  const history = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const id = queryParams.get('id');
  if (!id || !token) {
    errorNotification('Sorry, you cannot visit this page without a valid link sent to your email');
    history('/login');
  }

  const handleSubmit = async (values) => {
    console.log(values);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user-auth/reset-password?id=${id}&token=${token}`,
      {
        password: values.password,
      }
    );
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        history('/login');
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
        <div className="w-[100%] px-2 md:px-10 bg-[#111111da] overflow-x-scroll pt-[50px] pb-[50px] register-box">
          <div className="text-[24px] text-center mb-5 font-bold text-[#fff]">
            Reset account password
          </div>
          <div className="p-2 w-[100%]">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-[14.5px] md:text-[18px] grid grid-cols-1 gap-8 md:grid-cols-1 w-[100%] p-2 mb-2">
                <InputField name="password" placeholder="Set password" />
                <InputField name="confirmPassword" placeholder="Confirm password" />
              </div>
              <SubmitButton title="Reset Password" className="mt-10 w-[100%]" />
              <div className="text-[14px] md:text-[16px] text-center mt-[20px] flex justify-center gap-2">
                Remembered password?
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

export default ResetPasswordBody;
