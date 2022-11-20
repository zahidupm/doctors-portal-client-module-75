import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 text-base-content">
                    <li><Link to='/dashboard'>My Appointment</Link></li>
                    {
                        isAdmin && <>
                            <li><Link to='/dashboard/all_users'>All Users</Link></li>
                            <li><Link to='/dashboard/add_doctor'>Add a Doctor</Link></li>
                            <li><Link to='/dashboard/manage_doctors'>Manage Doctors</Link></li>
                        </>
                    }
                    </ul>
                
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;