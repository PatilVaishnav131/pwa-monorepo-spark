import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ScreeningPage from './pages/ScreeningPage';
import AppointmentPage from './pages/AppointmentPage';
import PeerSupportPage from './pages/PeerSupportPage';
import InsightsPage from './pages/InsightsPage';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

// Store
import { initializeAuth } from './store/authSlice';
import { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initialize anonymous authentication
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/screening" element={<ScreeningPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/peer-support" element={<PeerSupportPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;