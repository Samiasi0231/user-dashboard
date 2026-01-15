import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { HomePage } from './pages/HomePage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />

          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
