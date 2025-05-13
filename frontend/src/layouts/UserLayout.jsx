import React from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import About from '../components/About';
import Books from '../components/Books';
const UserLayout = () => {
    return (
        <div>
            <Header />
            <Home />
            <About />
            <Books />
            <Footer />
        </div>
    );
};
export default UserLayout;