import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

DropDownMenu.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};

export default function DropDownMenu({ setIsAuthenticated }) {
    const navigate = useNavigate();
        
    const navigateToAccount = () => {
        navigate('/mainPage/account');
    };

    const navigateToCreateArticle = () => {
        navigate('/mainPage/createArticle');
    };

    const navigateToSavedArticles = () => {
        navigate('/mainPage/savedArticles?page=1');
    };

    const navigateToMainPage = () => {
        navigate('/mainPage?page=1');;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        setIsAuthenticated(false);

        navigate("/");
    };

    return (
        <>
            <li onClick={navigateToMainPage}>
                <a>Main</a>
            </li>

            <li onClick={navigateToCreateArticle}>
                <a>Create Article</a>
            </li>

            <li onClick={navigateToSavedArticles}>
                <a>Saved Articles</a>
            </li>

            <li onClick={navigateToAccount}>
                <a>Account</a>
            </li>

            <li onClick={logout}>
                <a>Logout</a>
            </li>
        </>
    );
};