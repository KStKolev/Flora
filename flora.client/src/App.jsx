import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '/src/components/Login/Login';
import Register from '/src/components/Register/Register.jsx';
import ForgotPassword from '/src/components/ForgotPassword/ForgotPassword.jsx';
import AppBackground from '/src/components/Background/AppBackground.jsx';

function App() {
    
    return (
        <>
            <AppBackground/>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                </Routes>
            </Router>
        </>
    );

}

export default App;