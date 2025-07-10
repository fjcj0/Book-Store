import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import SignInPage from './pages/UserPages/SignInPage';
import SignUpPage from './pages/UserPages/SignUpPage';
import CodePage from './pages/UserPages/CodePage';
import HomePage from './pages/UserPages/HomePage';
import BookPage from './pages/UserPages/BookPage';
import DashboardPage from './pages/AdminPages/DashboardPage';
import AddBookPage from './pages/AdminPages/AddBookPage';
import EditBooksPage from './pages/AdminPages/EditBooksPage';
import EditBookPage from './pages/AdminPages/EditBookPage';
import RequestsPage from './pages/AdminPages/RequestsPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore.js';
import Loader from './tools/Loader.jsx';
import UserDashboardPage from './pages/UserPages/UserDashboardPage.jsx';
import BorrowedBooksPage from './pages/AdminPages/BorrowedBooksPage.jsx';
import ForgotPasswordPage from './pages/UserPages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/UserPages/ResetPasswordPage.jsx';
import SignInPageAdmin from './pages/AdminPages/SignInPageAdmin.jsx';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/code" replace />;
  }
  return children;
};
const ProtectedRouteAdmin = ({ children }) => {
  const { isAuthenticatedAdmin } = useAuthStore();
  if (!isAuthenticatedAdmin) {
    return <Navigate to="/signin-admin" replace />;
  }
  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const RedirectAuthenticatedAdmin = ({ children }) => {
  const { isAuthenticatedAdmin } = useAuthStore();
  if (isAuthenticatedAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};
const App = () => {
  const { checkAuth, isCheckingAuth, checkAuthAdmin } = useAuthStore();
  useEffect(() => {
    checkAuthAdmin();
    checkAuth();
  }, [checkAuth, checkAuthAdmin]);
  if (isCheckingAuth) return <div className='w-screen h-screen flex items-center justify-center'><Loader /></div>
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element=
            {
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
          <Route path="/book/:id" element=
            {<ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
            } />
          <Route path='/user/dashboard' element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={
            <ProtectedRouteAdmin>
              <DashboardPage />
            </ProtectedRouteAdmin>} />
          <Route path="/admin/addbook" element={<ProtectedRouteAdmin>
            <AddBookPage />
          </ProtectedRouteAdmin>} />
          <Route path="/admin/editbooks" element={<ProtectedRouteAdmin>
            <EditBooksPage />
          </ProtectedRouteAdmin>} />
          <Route path="/admin/editbook/:id" element={<ProtectedRouteAdmin>
            <EditBookPage />
          </ProtectedRouteAdmin>} />
          <Route path="/admin/requests" element={<ProtectedRouteAdmin>
            <RequestsPage />
          </ProtectedRouteAdmin>} />
          <Route path="/admin/borrowedbooks" element={<ProtectedRouteAdmin>
            <BorrowedBooksPage />
          </ProtectedRouteAdmin>} />
        </Route>
        <Route path="/signin" element={
          <RedirectAuthenticatedUser>
            <SignInPage />
          </RedirectAuthenticatedUser>}
        />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/code" element={
          <RedirectAuthenticatedUser>
            <CodePage />
          </RedirectAuthenticatedUser >} />
        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser >} />
        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
        <Route path='/signin-admin' element={<RedirectAuthenticatedAdmin>
          <SignInPageAdmin />
        </RedirectAuthenticatedAdmin>} />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;