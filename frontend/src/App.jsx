import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
const App = () => {
  return (
    <Routes>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/book/:id' element={<BookPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='/admin/addbook' element={<AddBookPage />} />
        <Route path='/admin/editbooks' element={<EditBooksPage />} />
        <Route path='/admin/editbook/:id' element={<EditBookPage />} />
      </Route>

      <Route path='/signin' element={<SignInPage />}></Route>
      <Route path='/signup' element={<SignUpPage />}></Route>
      <Route path='/code' element={<CodePage />}></Route>

    </Routes>
  );
};
export default App;