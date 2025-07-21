import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import { GoalsProvider } from './context/GoalsContext';
import { TransactionsProvider } from './context/TransactionsContext';
// import appLogo from './assets/logo.png'; // <--- ELIMINA ESTA LÍNEA
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GoalsProvider>
          <TransactionsProvider>
            <div className="app-container">
              {/* <header className="app-header">  <--- ELIMINA TODO ESTE BLOQUE
                <img src={appLogo} alt="Budget Bot Logo" className="app-logo" />
                <h1 className="app-title">Budget Bot</h1>
              </header> */}

              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>

              <nav className="bottom-nav">
                <Link to="/" className="nav-item">
                  🏠 Home
                </Link>
                <Link to="/reports" className="nav-item">
                  📝 Reports
                </Link>
                <Link to="/goals" className="nav-item">
                  🏆 Goals
                </Link>
                <Link to="/profile" className="nav-item">
                  👤 Profile
                </Link>
              </nav>
            </div>
          </TransactionsProvider>
        </GoalsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;