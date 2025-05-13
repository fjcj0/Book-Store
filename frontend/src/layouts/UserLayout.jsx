import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import About from '../components/About';
import Books from '../components/Books';
import { Outlet } from 'react-router';
const UserLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
export default UserLayout;