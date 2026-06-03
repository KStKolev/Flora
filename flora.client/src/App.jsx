import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '/src/components/Login/Login';
import Register from '/src/components/Register/Register.jsx';
import ForgotPassword from '/src/components/ForgotPassword/ForgotPassword.jsx';
import AppBackground from '/src/components/Background/AppBackground.jsx';
import MainPage from '/src/components/MainPage/MainPage.jsx';
import Account from '/src/components/MainPage/NavBar/Account.jsx';
import CreateArticle from '/src/components/MainPage/NavBar/CreateArticle.jsx';
import SavedArticles from '/src/components/MainPage/NavBar/SavedArticles.jsx';
import Article from '/src/components/MainPage/Article.jsx';
import DeleteArticle from '/src/components/MainPage/DeleteArticle.jsx';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("token")
    );

    return(
        <>
            <Router>
                {isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated} />}

                <Routes>
                    <Route path="/" element={
                        <>
                            <AppBackground />
                            <Login setIsAuthenticated={setIsAuthenticated} />
                        </>}
                    />

                    <Route path="/register" element={
                        <>
                            <AppBackground />
                            <Register setIsAuthenticated={setIsAuthenticated} />
                        </>}
                    />

                    <Route path="/forgotPassword" element={
                        <>
                            <AppBackground />
                            <ForgotPassword />
                        </>}
                    />

                    <Route
                        path="/mainPage"
                        element={
                            isAuthenticated
                                ? <MainPage />
                                : <Login setIsAuthenticated={setIsAuthenticated} />
                        }
                    />

                    <Route path="/mainPage/account" element={<Account />} />
                    <Route path="/mainPage/createArticle" element={<CreateArticle />} />
                    <Route path="/mainPage/savedArticles" element={<SavedArticles />} />
                    <Route path="/mainPage/article" element={<Article />} />
                    <Route path="/mainPage/article/deleteArticle" element={<DeleteArticle />} />
                </Routes>

                {isAuthenticated && <Footer />}
            </Router>
        </>
    );
}
export default App;