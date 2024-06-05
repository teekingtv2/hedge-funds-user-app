import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import TransactionsBody from '../../components/TransactionsBody';
import useFetchCredential from '../../api/useFetchCredential';

const TransactionsPage = () => {
  const { data, loading, error } = useFetchCredential(`user-profile/transactions`);

  return (
    <>
      <Head pageTitle="Transactions" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        {data && <TransactionsBody data={data.data} />}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500 text-[18px]">{error}</div>}
      </div>
    </>
  );
};

export default TransactionsPage;
