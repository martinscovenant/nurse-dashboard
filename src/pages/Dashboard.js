import React, { useContext } from "react";
import Charts from "../components/Charts";
import { PatientContext } from "../context/PatientContext";
import { FaUserCheck, FaUserPlus, FaHospitalUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {

    const { patients } = useContext(PatientContext);
    const navigate = useNavigate();
    // Calculations
    const totalPatients = patients.length;

    const dischargedPatients = patients.filter(p => p.discharged).length;
    const prevPatients = JSON.parse(localStorage.getItem("prevPatients")) || [];

    const percentageChange = prevPatients.length
        ? ((patients.length - prevPatients.length) / prevPatients.length) * 100
        : 0;

    useEffect(() => {
        localStorage.setItem("prevPatients", JSON.stringify(patients));
    }, [patients]);

    return (
        <>
            <div className="welcome">
                <h2>Welcome back 👋</h2>
                <p>You’ve got {totalPatients} patients</p>
            </div>

            <div className="cards">

                {/* DISCHARGED */}
                <div
                    className="card clickable animated-card"
                    onClick={() => navigate("/patients?filter=discharged")}
                >
                    <FaUserCheck className="card-icon" />
                    <h3>Discharged</h3>
                    <p>{dischargedPatients} Patients</p>

                    <small className="percent">
                        {percentageChange.toFixed(1)}% from last update
                    </small>
                </div>

                {/* ACTIVE */}
                <div
                    className="card clickable animated-card"
                    onClick={() => navigate("/patients?filter=active")}
                >
                    <FaUserPlus className="card-icon" />
                    <h3>Active Patients</h3>
                    <p>{patients.filter(p => !p.discharged).length}</p>

                    <small className="percent">
                        {percentageChange.toFixed(1)}% from last update
                    </small>
                </div>

                {/* TOTAL */}
                <div
                    className="card clickable animated-card"
                    onClick={() => navigate("/patients?filter=all")}
                >
                    <FaHospitalUser className="card-icon" />
                    <h3>Total Patients</h3>

                    <p>{totalPatients} Patients</p>

                    <small className="percent">
                        {percentageChange.toFixed(1)}% from last update
                    </small>
                </div>

            </div>
            <Charts />
        </>
    );
};

export default Dashboard;