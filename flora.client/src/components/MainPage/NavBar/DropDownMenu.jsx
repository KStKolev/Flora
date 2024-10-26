import { useNavigate } from 'react-router-dom';
export default function DropDownMenu() {
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
        </>
    );
};