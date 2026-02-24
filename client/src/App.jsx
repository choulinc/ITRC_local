import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AchievementsPage from './pages/AchievementsPage';
import ActivityRecordsPage from './pages/ActivityRecordsPage';
import ActivityPlansPage from './pages/ActivityPlansPage';
import ExperiencesPage from './pages/ExperiencesPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/activities" element={<ActivityRecordsPage />} />
                <Route path="/plans" element={<ActivityPlansPage />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </>
    );
}
