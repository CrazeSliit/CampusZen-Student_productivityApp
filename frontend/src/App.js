import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import EventDashboard from "./pages/EventDashboard";

// Your pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import DailyHealth from "./pages/DailyHealth";
import HealthtipsandSupport from "./pages/HealthtipsandSupport";
import HealthyHabits from "./pages/HealthyHabits";
import Health from "./pages/Health";

// Group member added pages
import Event from "./pages/Event";
import ActivityDetails from "./pages/ActivityDetails";
import Sports from "./pages/Sports";
import Clubs from "./pages/Clubs";

// new pages for login
import LoginDashboard from "./pages/LoginDashboard";

// Learning & Study Management
import StudyGroup from "./pages/StudyGroup";
import ResourceSharing from "./pages/ResourceSharing";
import AssignmentTracking from "./pages/AssignmentTracking";
import TimetableManagement from "./pages/TimetableManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Events */}
        <Route path="/events" element={<EventDashboard />} />
        <Route path="/events/list" element={<Event />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/activity/:activityType" element={<ActivityDetails />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Health Module */}
        <Route path="/daily-health" element={<DailyHealth />} />
        <Route path="/health-resources" element={<HealthtipsandSupport />} />
        <Route path="/healthy-habits" element={<HealthyHabits />} />
        <Route path="/health" element={<Health />} />
        <Route path="/dashboard" element={<LoginDashboard />} />

        {/* Learning & Study Management */}
        <Route path="/study/groups" element={<StudyGroup />} />
        <Route path="/study/resources" element={<ResourceSharing />} />
        <Route path="/study/assignments" element={<AssignmentTracking />} />
        <Route path="/study/timetable" element={<TimetableManagement />} />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;