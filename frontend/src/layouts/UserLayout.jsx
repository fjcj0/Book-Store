import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Slide from '../components/Slide';
const UserLayout = () => {
    return (
        <div>
            <Slide />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
export default UserLayout;