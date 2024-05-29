import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import useFetchCredential from '../../api/useFetchCredential';
import axios from 'axios';
import WithdrawalBody from '../../components/WithdrawalBody';
axios.defaults.withCredentials = true;

const WithdrawPage = () => {
  const { data, loading, error } = useFetchCredential(`user-profile/user`);

  return (
    <>
      <Head pageTitle="Welcome Home" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        {data && <WithdrawalBody userData={data.data} />}
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default WithdrawPage;
