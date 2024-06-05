import React from 'react';
import { dateFormatter, formatter } from '../utils/helpers';

const TransactionsBody = ({ data }) => {
  return (
    <div className="h-[100%] w-[100%]">
      <div className="">
        <div className="text-[25px] font-bold mb-[10px]">All Transactions</div>
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

            {data &&
              data.map((trans, i) => {
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

export default TransactionsBody;
