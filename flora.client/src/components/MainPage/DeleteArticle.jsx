import Footer from '/src/components/MainPage/Footer.jsx';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import '/src/stylesheet/MainPage/DeleteArticle.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DeleteArticle() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state || undefined;

    const goBack = () => {
        navigate(-1);
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5155/api/article/delete/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            navigate('/mainPage');
        } 
    };

    return (
        <>
            <NavBar />
            <section className="deleteArticleSection">
                <h1>Delete Article?</h1>
                <div className="deleteButtonsContainer">
                    <button className="returnButton" onClick={goBack}>Return</button>
                    <button className="deleteButton" onClick={handleDelete}>Delete</button>
                </div>
            </section>
            <Footer />
        </>
    );
}