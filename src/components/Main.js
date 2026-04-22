import React from 'react';
import { FaSearch, FaPlus, FaUserCheck, FaUserPlus, FaHospitalUser } from "react-icons/fa";
import Charts from "./Charts";

const Main = () => {
    return (
        <div className="main">

            {/* Topbar */}
            <div className="topbar">
                <div className="search-box">
                    <FaSearch />
                    <input type="text" placeholder="Search..." />
                </div>

                <button className="btn">
                    <FaPlus /> New Task
                </button>
            </div>

            {/* Welcome */}
            <div className="welcome">
                <h2>Welcome back 👋</h2>
                <p>You’ve got 12 new updates today</p>
            </div>

            {/* Cards */}
            <div className="cards">

                <div className="card">
                    <FaUserCheck className="card-icon" />
                    <h3>Discharge</h3>
                    <p>16 Patients</p>
                </div>

                <div className="card">
                    <FaUserPlus className="card-icon" />
                    <h3>New Patients</h3>
                    <p>125 this month</p>
                </div>

                <div className="card">
                    <FaHospitalUser className="card-icon" />
                    <h3>Total Patients</h3>
                    <p>2000+</p>
                </div>

            </div>

            <Charts />

        </div>
    );
};

export default Main;