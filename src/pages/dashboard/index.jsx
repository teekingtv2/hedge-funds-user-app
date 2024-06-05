import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import DashboardBody from '../../components/DashboardBody';
import useFetchCredential from '../../api/useFetchCredential';
import axios from 'axios';
axios.defaults.withCredentials = true;

const DashboardPage = () => {
  const { data, loading } = useFetchCredential(`user-profile/user`);
  const { data: transData, loading: transLoading } =
    useFetchCredential(`user-profile/transactions`);
  const {
    data: walletData,
    loading: walletLoading,
    error: walletError,
  } = useFetchCredential(`admin-auth/get-wallet-address`);

  return (
    <>
      <Head pageTitle="Welcome Home" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        {data && transData && walletData && (
          <DashboardBody
            userData={data.data}
            transData={transData.data}
            walletData={walletData.data[0]}
          />
        )}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default DashboardPage;
