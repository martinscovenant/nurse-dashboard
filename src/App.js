import './App.css';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';

import { Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Scheduler from './pages/Scheduler';
import Encounters from './pages/Encounters';
import History from './pages/History';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/encounters" element={<Encounters />} />
          <Route path="/history" element={<History />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      <RightPanel />
    </div>
  );
}

export default App;