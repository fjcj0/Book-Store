import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>

      </Route>

      <Route path="/admin" element={<AdminLayout />}>

      </Route>
    </Routes>
  );
};
export default App;