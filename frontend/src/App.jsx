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
import { useAuthStore } from './store/AuthStore.js';
import Loader from './tools/Loader.jsx';
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
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
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
          <Route path="/book/:id" element={<BookPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/admin/addbook" element={<AddBookPage />} />
          <Route path="/admin/editbooks" element={<EditBooksPage />} />
          <Route path="/admin/editbook/:id" element={<EditBookPage />} />
          <Route path="/admin/requests" element={<RequestsPage />} />
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
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
