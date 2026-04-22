import React, { createContext, useState, useEffect } from "react";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {

    const [patients, setPatients] = useState([]);

    const deletePatient = (id) => {
        setPatients(prev => prev.filter(p => p.id !== id));
    };

    const undoDischarge = (id) => {
        setPatients(prev =>
            prev.map(p =>
                p.id === id ? { ...p, discharged: false } : p
            )
        );
    };

    // Load from localStorage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("patients")) || [];
        setPatients(data);
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("patients", JSON.stringify(patients));
    }, [patients]);

    // ✅ Add Patient (FIXED WITH createdAt)
    const addPatient = (patient) => {
        const newPatient = {
            id: Date.now(),
            ...patient,
            createdAt: new Date().toISOString(), // ✅ CORRECT PLACE
            isNew: true,
            discharged: false
        };

        setPatients(prev => [...prev, newPatient]);
    };

    // Discharge Patient
    const dischargePatient = (id) => {
        setPatients(prev =>
            prev.map(p =>
                p.id === id ? { ...p, discharged: true } : p
            )
        );
    };

    return (
        <PatientContext.Provider
            value={{
                patients,
                setPatients,
                addPatient,
                dischargePatient,
                deletePatient,
                undoDischarge
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};