import React, { useContext, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";
import { PatientContext } from "../context/PatientContext";

// Register components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    Tooltip,
    Legend
);

const Charts = () => {

    const { patients } = useContext(PatientContext);
    const [range, setRange] = useState("weekly");

    // ✅ ACTIVE / DISCHARGED COUNTS
    const active = patients.filter(p => !p.discharged).length;
    const discharged = patients.filter(p => p.discharged).length;

    // ✅ WEEKLY DATA
    const getWeeklyData = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const counts = Array(7).fill(0);

        patients.forEach(p => {
            if (!p.createdAt) return; // safety check
            const date = new Date(p.createdAt);
            const day = date.getDay();
            counts[day]++;
        });

        return { labels: days, data: counts };
    };

    // ✅ MONTHLY DATA
    const getMonthlyData = () => {
        const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        const counts = [0, 0, 0, 0];

        patients.forEach(p => {
            if (!p.createdAt) return;
            const date = new Date(p.createdAt);
            const week = Math.floor((date.getDate() - 1) / 7);
            if (week < 4) counts[week]++;
        });

        return { labels, data: counts };
    };

    // ✅ SELECT DATA
    const chartSource =
        range === "weekly" ? getWeeklyData() : getMonthlyData();

    // ✅ LINE DATA (DYNAMIC)
    const lineData = {
        labels: chartSource.labels,
        datasets: [
            {
                label: "Patient Growth",
                data: chartSource.data,
                borderColor: "#6c63ff",
                backgroundColor: "rgba(108,99,255,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 8
            }
        ]
    };

    // ✅ LINE OPTIONS (TOOLTIP + ANIMATION)
    const lineOptions = {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { display: true }
        },
        animation: {
            duration: 1000,
            easing: "easeInOutQuart"
        }
    };

    // ✅ DOUGHNUT DATA
    const doughnutData = {
        labels: ["Active", "Discharged"],
        datasets: [
            {
                data: [active, discharged],
                backgroundColor: ["#4CAF50", "#e63946"]
            }
        ]
    };

    return (
        <div className="charts">

            {/* FILTER BUTTONS */}
            <div className="chart-filter">
                <button onClick={() => setRange("weekly")}>
                    Weekly
                </button>
                <button onClick={() => setRange("monthly")}>
                    Monthly
                </button>
            </div>

            {/* LINE CHART */}
            <div className="chart-box">
                <h4>Patient Growth ({range})</h4>
                <Line data={lineData} options={lineOptions} />
            </div>

            {/* DOUGHNUT */}
            <div className="chart-box">
                <h4>Patient Status</h4>
                <Doughnut data={doughnutData} />
            </div>

        </div>
    );
};

export default Charts;