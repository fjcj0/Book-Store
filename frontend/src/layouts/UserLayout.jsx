import React from 'react';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
    return (
        <div>
            <header>User Header</header>
            <main><Outlet /></main>
            <footer>User Footer</footer>
        </div>
    );
};
export default UserLayout;