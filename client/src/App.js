import './App.css';
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div className="bg-bgColors h-screen">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/auth/signIn" element={<SignIn />} />
        <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
