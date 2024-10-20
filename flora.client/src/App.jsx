import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '/src/components/Login/Login';
import Register from '/src/components/Register/Register.jsx';
import ForgotPassword from '/src/components/ForgotPassword/ForgotPassword.jsx';
import AppBackground from '/src/components/Background/AppBackground.jsx';
import MainPage from '/src/components/MainPage/MainPage.jsx';
import Account from '/src/components/MainPage/NavBar/Account.jsx';
import CreateArticle from '/src/components/MainPage/NavBar/CreateArticle.jsx';
import DeleteArticle from '/src/components/MainPage/NavBar/DeleteArticle.jsx';
import SavedArticles from '/src/components/MainPage/NavBar/SavedArticles.jsx';

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
                    <Route path="/mainPage" element={<MainPage />} />
                    <Route path="/mainPage/account" element={<Account />} />
                    <Route path="/mainPage/createArticle" element={<CreateArticle />} />
                    <Route path="/mainPage/savedArticles" element={<SavedArticles />} />
                    <Route path="/mainPage/deleteArticle" element={<DeleteArticle />} />
                </Routes>
            </Router>
        </>
    );
}
export default App;