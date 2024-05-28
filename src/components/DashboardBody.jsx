import React from 'react';
import { dateFormatter, formatter, successNotification } from '../utils/helpers';

const DashboardBody = ({ userData, transData, walletData }) => {
  const copyErc20Text = () => {
    const txt = walletData && walletData.erc20;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`ERC20 wallet address copied`);
  };

  const copyBitcoinText = () => {
    const txt = walletData && walletData.bitcoin;
    const input = document.createElement('input');
    input.value = txt;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    successNotification(`Bitcoin wallet address copied`);
  };

  return (
    <div className="h-[100%] w-[100%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">{formatter.format(userData.deposite_balance)}</div>
            <div className="text-[14px] md:text-[15px]">Deposit Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Amount Deposited</div>
          </div>
        </div>
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">{formatter.format(userData.profit_balance)}</div>
            <div className="text-[14px] md:text-[15px]">Trading Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Total Profit Made</div>
          </div>
        </div>
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">{formatter.format(userData.total_balance)}</div>
            <div className="text-[14px] md:text-[15px]">Total Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Withdrawable Balance</div>
          </div>
        </div>
      </div>

      <div className="mb-10 mt-5 p-2 bg-[#151515c2] w-[100%] text-center">
        <div className="p-2 mb-2 w-[100%] text-[14px]">
          <div className="text-red-500">Only send ERC20 tokens (ETH) to this address</div>
          <div className="col-span-1" onClick={copyErc20Text}>
            ERC20 Wallet - {walletData.erc20.substr(0, 8)}...(tap to copy)
          </div>
          <div className="text-red-500 mt-4">Only send Bitcoin to this address</div>
          <div className="col-span-1" onClick={copyBitcoinText}>
            Bitcoin Wallet - {walletData.bitcoin.substr(0, 8)}...(tap to copy)
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-[20px] md:text-[25px] font-bold mb-[10px]">Recent Transactions</div>
        <div className="p-2 bg-[#151515c2] overflow-x-scroll ">
          <div className="p-2 mb-2 w-[720px] md:w-[883px]">
            <div className="font-bold text-[14px] md:text-[18px] grid grid-cols-10 w-[100%] p-2 mb-2">
              <div className="col-span-1">SN</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Trans Amount</div>
              <div className="col-span-2">Profit</div>
              <div className="col-span-2">Balance Due</div>
            </div>
            {transData &&
              transData.map((trans, i) => {
                const date = dateFormatter(trans.createdAt);
                return (
                  <div
                    key={i}
                    className="text-[15] md:text-[16px] grid grid-cols-10 w-[100%] p-2 my-1 bg-[#444444]"
                  >
                    <div className="col-span-1">{i + 1}</div>
                    <div className="col-span-1 ">{trans.type}</div>
                    <div className="col-span-2 text-[13px] md:text-[15px]">{date}</div>
                    <div className="col-span-2">{formatter.format(trans.transaction_amount)}</div>
                    <div className="col-span-2">{formatter.format(trans.profit_amount)}</div>
                    <div className="col-span-2">{formatter.format(trans.wallet_balance)}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
