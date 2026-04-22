import React from 'react';
import { NavLink } from "react-router-dom";
import {
    FaChartLine,
    FaUser,
    FaTasks,
    FaCalendarAlt,
    FaHistory,
    FaEnvelope,
    FaCog
} from "react-icons/fa";



const Sidebar = () => {
    
    return (
        <aside className="sidebar">

            <div className="logo">+</div>

            <ul>

                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                        <FaChartLine />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaUser />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/encounters" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaTasks />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/scheduler" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaCalendarAlt />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaHistory />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/inbox" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaEnvelope />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaCog />
                    </NavLink>
                </li>

            </ul>
        </aside>
    );
};

export default Sidebar;