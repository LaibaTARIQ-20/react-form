import './App.css';
import Nav from './components/nav.jsx';
import Signin from './pages/signin.jsx';
import Signup from './pages/signup.jsx';
import ForgotPassword from './pages/forgot.jsx';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <div style={{ paddingTop: 96 }}>CAREER LAUNCHPAD</div>;
}

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;