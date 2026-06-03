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
        const token = localStorage.getItem("token");

        const response = await fetch(`https://localhost:7126/api/article/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            navigate('/mainPage');
        } 
    };

    return (
        <section className="deleteArticleSection">
            <h1>Delete Article?</h1>

            <div className="deleteButtonsContainer">
                <button className="returnButton" onClick={goBack}>Return</button>
                <button className="deleteButton" onClick={handleDelete}>Delete</button>
            </div>
        </section>
    );
}