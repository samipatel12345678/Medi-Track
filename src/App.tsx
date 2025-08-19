import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrescriptionProvider } from './context/PrescriptionContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import SummaryPage from './pages/SummaryPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <PrescriptionProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <MobileNav />
        </div>
      </Router>
    </PrescriptionProvider>
  );
}

export default App;
