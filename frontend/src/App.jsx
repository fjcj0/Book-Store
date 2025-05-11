import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import SignInPage from './pages/UserPages/SignInPage';
import SignUpPage from './pages/UserPages/SignUpPage';
import CodePage from './pages/UserPages/CodePage';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>

      </Route>

      <Route path="/admin" element={<AdminLayout />}>

      </Route>
      <Route path='/signin' element={<SignInPage />}></Route>
      <Route path='/signup' element={<SignUpPage />}></Route>
      <Route path='/code' element={<CodePage />}></Route>
    </Routes>
  );
};
export default App;