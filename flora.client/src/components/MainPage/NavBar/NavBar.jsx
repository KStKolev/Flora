import '/src/stylesheet/MainPage/NavBar/NavBar.css';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    const navigateToAccount = () => {
        navigate('/mainPage/account');
    };

    const navigateToDeleteArticle = () => {
        navigate('/mainPage/deleteArticle');
    };

    const navigateToCreateArticle = () => {
        navigate('/mainPage/createArticle');
    };

    const navigateToSavedArticles = () => {
        navigate('/mainPage/savedArticles');
    };

    return (
        <ul className="navigationBar">
            <li>
                <a className="createArticleAnchor" onClick={navigateToCreateArticle}>Create Article</a>
            </li>
            <li>
                <a className="savedArticlesAnchor" onClick={navigateToSavedArticles}>Saved Articles</a>
            </li>
            <li>
                <a className="deleteArticlesAnchor" onClick={navigateToDeleteArticle}>Delete Articles</a>
            </li>
            <li>
                <a className="accountAnchor" onClick={navigateToAccount}>Account</a>
            </li>
        </ul>
    );
};