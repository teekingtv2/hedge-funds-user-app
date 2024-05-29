import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/index.jsx';
import NotFound from './pages/404';
import LoginPage from './pages/auth/login/index.jsx';
import ForgotPasswordPage from './pages/auth/forgot-password/index.jsx';
import EditProfilePage from './pages/edit-profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPasswordPage from './pages/edit-password/index.jsx';
import TransactionsPage from './pages/transactions/index.jsx';
import VerifyEmailPage from './pages/auth/verify-email/index.jsx';
import ResetPasswordPage from './pages/auth/reset-password/index.jsx';
import RegisterPage from './pages/auth/register/index.jsx';
import WithdrawPage from './pages/withdraw/index.jsx.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="">
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
          />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/edit-password" element={<EditPasswordPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-account" element={<VerifyEmailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
