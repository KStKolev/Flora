import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '/src/components/Login/Login';
import Register from '/src/components/Register/Register.jsx';
import ForgotPassword from '/src/components/ForgotPassword/ForgotPassword.jsx';
import AppBackground from '/src/components/Background/AppBackground.jsx';
import MainPage from '/src/components/MainPage/MainPage.jsx';

function App() {
    return(
        <>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <>
                            <AppBackground />
                            <Login />
                        </>}
                    />
                    <Route path="/register" element={
                        <>
                            <AppBackground />
                            <Register />
                        </>}
                    />
                    <Route path="/forgotPassword" element={
                        <>
                            <AppBackground />
                            <ForgotPassword />
                        </>}
                    />
                    <Route path="/mainPage" element={<MainPage/>} />
                </Routes>
            </Router>
        </>
    );
}
export default App;