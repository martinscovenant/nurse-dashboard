import React, { useState, useContext, useEffect } from "react";
import { PatientContext } from "../context/PatientContext";
import { useLocation, useNavigate } from "react-router-dom";

const Patients = () => {

    const {
        patients,
        addPatient,
        dischargePatient,
        undoDischarge,
        deletePatient
    } = useContext(PatientContext);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [condition, setCondition] = useState("");
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("active");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get("
    useEffect(() => {
        if (filter === "discharged") {
            setActiveTab("discharged");
        } else if (filter === "active" || filter === "all") {
            setActiveTab("active");
        }
    }, [filter]);

    const handleAddPatient = () => {
        if (!name || !age || !condition) {
            alert("Fill all fields");
            return;
        }

        addPatient({ name, age, condition });

        setName("");
        setAge("");
        setCondition("");
    };

    let displayPatients = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filter) {
        if (filter === "discharged") {
            displayPatients = displayPatients.filter(p => p.discharged);
        } else if (filter === "active") {
            displayPatients = displayPatients.filter(p => !p.discharged);
        } else if (filter === "all") {
        }
    } else {
        if (activeTab === "active") {
            displayPatients = displayPatients.filter(p => !p.discharged);
        } else {
            displayPatients = displayPatients.filter(p => p.discharged);
        }
    }

    return (
        <div>
            <h2>Patients</h2>

            {filter && (
                <div className="filter-bar">
                    <span className="filter-label">
                        Showing: {filter === "active" && "🟢 Active Patients"}
                        {filter === "discharged" && "🔴 Discharged Patients"}
                        {filter === "all" && "📊 All Patients"}
                    </span>

                    <button
                        className="clear-btn"
                        onClick={() => navigate("/patients")}
                    >
                        Clear Filter ✖
                    </button>
                </div>
            )}

            <input
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="tabs">

                <button
                    className={activeTab === "active" ? "tab active" : "tab"}
                    onClick={() => {
                        setActiveTab("active");
                        navigate("/patients");
                    }}
                >
                    Active Patients ({patients.filter(p => !p.discharged).length})
                </button>

                <button
                    className={activeTab === "discharged" ? "tab active" : "tab"}
                    onClick={() => {
                        setActiveTab("discharged");
                        navigate("/patients");
                    }}
                >
                    Discharged Patients ({patients.filter(p => p.discharged).length})
                </button>

            </div>

            <div className="form">
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <input
                    placeholder="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                />

                <button onClick={handleAddPatient}>
                    Add Patient
                </button>
            </div>

            <div>
                {displayPatients.length === 0 ? (
                    <p>No patients found</p>
                ) : (
                    displayPatients.map((p) => (
                        <div key={p.id} className="patient-card">

                            <h4>{p.name}</h4>
                            <p>Age: {p.age}</p>
                            <p>{p.condition}</p>

                            <p className={p.discharged ? "status discharged" : "status active"}>
                                {p.discharged ? "🔴 Discharged" : "🟢 Active"}
                            </p>

                            <div className="actions">

                                {!p.discharged ? (
                                    <button onClick={() => dischargePatient(p.id)}>
                                        Discharge
                                    </button>
                                ) : (
                                    <button onClick={() => undoDischarge(p.id)}>
                                        Undo
                                    </button>
                                )}

                                <button
                                    className="delete-btn"
                                    onClick={() => deletePatient(p.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Patients;
