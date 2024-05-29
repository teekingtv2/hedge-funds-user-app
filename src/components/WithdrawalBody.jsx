import React from 'react';
import InputField from './forms/InputField';
import CustomFormik from '../utils/CustomFormik';
import { validateWithdrawal } from '../utils/validate';
import { withdrawalValues } from '../utils/initialValues';
import SubmitButton from './forms/SubmitButton';
import { Link } from 'react-router-dom';
import { errorNotification, formatter, successNotification } from '../utils/helpers';
import axios from 'axios';
axios.defaults.withCredentials = true;

const WithdrawalBody = ({ userData }) => {
  const initialValues = withdrawalValues(userData.total_balance);
  const validationSchema = validateWithdrawal();

  const handleSubmit = async (values) => {
    console.log(values);
    errorNotification('You cannot withdraw at this moment. Please try later.');
  };

  const copyBitcoinText = () => {
    const txt = userData && userData.wallet;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`Your ${userData.network} wallet address copied`);
  };

  return (
    <>
      <div className=" w-[100%]">
        <div className="">
          <div className="flex justify-between items-end mb-10">
            <div className="text-[18px] md:text-[25px] font-bold mb-[10px]">Withdraw Funds</div>
            <Link className="primary-btn" to="/">
              Go back
            </Link>
          </div>
          {userData && (
            <div className="p-2 bg-[#151515c2]  overflow-x-scroll pt-8 pb-5">
              <div className="mb-5 mt-5 p-2 bg-[#151515c2] max-w-[500px] mx-auto text-center">
                <div className="p-2 mb-2 w-[100%] text-[14px]">
                  <div className="text-red-500 mb-3">
                    Your Wallet Addresses as added to your profile
                  </div>
                  <div className="w-[100%] mx-auto flex justify-between mb-2 text-[15px]">
                    <div className="font-[500]">Wallet</div>
                    <div className="" onClick={copyBitcoinText}>
                      {userData.wallet}
                    </div>
                  </div>
                  <div className="w-[100%] mx-auto flex justify-between mb-2 text-[15px]">
                    <div className="font-[500]">Network</div>
                    <div className="">{userData.network}</div>
                  </div>
                </div>
              </div>
              <div className="p-2 mx-auto max-w-[500px]">
                <CustomFormik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <div className="font-[400] text-[14.5px] md:text-[18px] w-[100%] p-2 ">
                    <div className="mb-4 text-center text-[#b99dfa]">
                      Your total balance is{' '}
                      <span className="text-[#eee]">
                        {formatter.format(userData.total_balance)}
                      </span>
                    </div>
                    <InputField name="amount" placeholder="Amount to withdraw" />
                  </div>
                  <SubmitButton title="Withdraw Funds" className="mt-10 w-[100%]" />
                </CustomFormik>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WithdrawalBody;
