import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import RegisterForm from './components/auth/RegisterForm'; // <--- Probable corrección
import LoginForm from './components/auth/LoginForm';     // <--- Probable corrección
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';
import { GoalsProvider } from './context/GoalsContext';
import { TransactionsProvider } from './context/TransactionsContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GoalsProvider>
          <TransactionsProvider>
            <div className="app-container">
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
              </div>

              {/* ... your bottom navigation ... */}
              <nav className="bottom-nav">
                <Link to="/" className="nav-item">🏠 Home</Link>
                <Link to="/reports" className="nav-item">📝 Reports</Link>
                <Link to="/goals" className="nav-item">🏆 Goals</Link>
                <Link to="/profile" className="nav-item">👤 Profile</Link>
              </nav>
            </div>
          </TransactionsProvider>
        </GoalsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;