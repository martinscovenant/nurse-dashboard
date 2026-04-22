import React from 'react';
import { FaStethoscope, FaNotesMedical, FaSyringe } from "react-icons/fa";

const RightPanel = () => {
    return (
        <aside className="right-panel">

            <div className="profile">
                <img src="https://i.pravatar.cc/100" alt="profile" />
                <h3>Jennifer Turner</h3>
                <p>Senior Nurse</p>
            </div>

            <div className="tasks">
                <h4>Ongoing Tasks</h4>
                <p><FaStethoscope /> Diagnostic Tests</p>
                <p><FaNotesMedical /> Patient History</p>
                <p><FaSyringe /> Administer Drugs</p>
            </div>

        </aside>
    );
};

export default RightPanel;