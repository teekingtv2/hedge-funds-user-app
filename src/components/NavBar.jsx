import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorNotification, infoNotification, successNotification } from '../utils/helpers';
import useFetchCredential from '../api/useFetchCredential';
axios.defaults.withCredentials = true;

const NavBar = ({ name }) => {
  const history = useNavigate();
  const [nav, setNav] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [linkColor, setLinkColor] = useState('#1f2937');
  const [activeLink, setActiveLink] = useState('home');

  const { data, loading } = useFetchCredential(`user-profile/user`);

  const handleNavToggle = () => {
    setNav(!nav);
  };
  const handleConnectWalletToggle = () => {
    // setShowConnectWallet(!showConnectWallet);
    // infoNotification('Coming soon!');
  };

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
  const handleLogout = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user-auth/logout`, null, {
      withCredentials: true,
    });
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => history('/login'), 2000);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="w-full shadow-lg z-[100] bg-[transparent]">
        <div className="flex justify-between items-center max-w-[95%] py-6 md:py-10 mx-auto w-full h-full">
          <Link to="/">
            <img
              src="/assets/images/logo.png"
              alt="Mudashir Tunde"
              className="w-[75px] md:w-[90px]"
            />
          </Link>
          <div className="flex gap-8">
            <div
              onClick={handleNavToggle}
              className="text-sm font-bold hover:border-b flex justify-center items-center cursor-pointer"
            >
              <span className="hidden md:block mr-2 md:text-[17px]">
                {data ? data?.data?.name.split(' ')[0] : 'User'}'s Menu
              </span>
              <span>
                <AiOutlineMenu size={25} className="" />
              </span>
            </div>
            <div
              onMouseEnter={handleConnectWalletToggle}
              className="border border-dotted rounded-[20px] py-2 px-2 md:py-4 md:px-6 text-sm font-bold hover:border-b flex justify-center items-center"
            >
              <span className="mr-2 text-[16px] md:text-[17px]">Connect Wallet</span>
              <span>
                <FaWallet />
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={nav ? 'fixed right-0 top-0 bg-black/70' : ''} style={{ zIndex: '11111' }}>
          <div
            className={
              nav
                ? 'fixed right-0 top-0 ease-in duration-500 bg-[#000000] p-10 shadow-md shadow-gray-500 rounded-[40px]'
                : 'fixed right-[-100%] top-0 ease-in duration-500 p-10'
            }
          >
            <div>
              <div className="flex w-full justify-between items-center gap-5">
                <img
                  src="/assets/images/user.avif"
                  alt="Mudashir Tunde"
                  className="h-[100px] rounded-[50px]"
                />
                <div
                  onClick={handleNavToggle}
                  className="rounded-full shadow-md shadow-gray-500 p-2 cursor-pointer text-gray-200"
                >
                  <AiOutlineClose size={25} />
                </div>
              </div>
            </div>
            <div className="py-4 flex flex-col">
              <ul className="uppercase">
                <Link
                  onClick={() => setNav(false)}
                  to="/"
                  className={activeLink === '' ? 'active' : 'text-gray-200'}
                >
                  <li className="py-4 text-sm">Dashboard</li>
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  to="/edit-profile"
                  className={activeLink === 'edit-profile' ? 'active' : 'text-gray-200'}
                >
                  <li className="py-4 text-sm">Edit Profile</li>
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  to="/edit-password"
                  className={activeLink === 'edit-password' ? 'active' : 'text-gray-200'}
                >
                  <li className="py-4 text-sm">Edit Password</li>
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  to="/transactions"
                  className={activeLink === 'transactions' ? 'active' : 'text-gray-200'}
                >
                  <li className="py-4 text-sm">Transactions</li>
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  to="/withdraw"
                  className={activeLink === '' ? 'active' : 'text-gray-200'}
                >
                  <li className="py-4 text-sm">Withdraw</li>
                </Link>
                <div onClick={handleLogout} className="flex justify-start items-center gap-3">
                  <li className="py-4 text-sm">Logout</li>
                  <span>
                    <FaSignOutAlt />
                  </span>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Connect Wallet */}
        <div
          className={showConnectWallet ? 'fixed left-0 top-0 w-full h-screen bg-black/70 ' : ''}
          style={{ zIndex: '11111' }}
        >
          <div
            className={
              showConnectWallet
                ? 'fixed left-[5%] top-[5%] md:left-[25%] md:top-[25%]  w-[90%] h-[90%] md:w-[50%] md:h-[50%] m-auto ease-in duration-500 bg-[#fff] p-5 shadow-md shadow-gray-500 rounded-[40px]'
                : 'fixed left-[-100%] top-0 ease-in duration-500 p-10'
            }
          >
            <div className="flex w-full justify-end items-center gap-5">
              <div
                onClick={handleConnectWalletToggle}
                className="rounded-full shadow-md shadow-gray-500 p-2 cursor-pointer text-gray-200"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 h-[85%] gap-5">
              <div className="col-span-1 md:col-span-2 bg-[#d3d2d2] h-[100%]"></div>
              <div className="col-span-1 md:col-span-3 h-[100%] bg-[#d3d2d2]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
