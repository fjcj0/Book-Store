import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import About from '../components/About';
const UserLayout = () => {
    return (
        <div>
            <Header />
            <Home />
            <About />
            <Footer />
        </div>
    );
};
export default UserLayout;