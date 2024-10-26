import Footer from '/src/components/MainPage/Footer.jsx';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import '/src/stylesheet/MainPage/Article.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Article() {
    const location = useLocation();
    const { article } = location.state || {};
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const checkIfSaved = async () => {
            const response = await fetch(`http://localhost:5155/api/save/isArticleSaved/${article.id}`);
            const result = await response.json();
            setIsSaved(result);
        };

        if (article) {
            checkIfSaved();
        }
    }, [article]);

    const saveArticle = async () => {
        const response = await fetch(`http://localhost:5155/api/save/saveArticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article.id),
        });

        if (response.ok) {
            setIsSaved(true);
        }
    };

    const removeSavedArticle = async () => {
        const response = await fetch(`http://localhost:5155/api/save/removeSavedArticle/${article.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setIsSaved(false);
        }
    };

    if (!article) {
        return <div>No article found</div>;
    }

    return (
        <section className="articleSection">
            <NavBar />
            <article className="article-container">
                <div className="articleDisplayTitle">
                    <h1>{article.title}</h1>
                    <p className="timeToRead">Estimated time: {article.timeToRead} minute/s</p>
                </div>
                <p className="articleDisplayDescription">{article.description}</p>
                <img src={`data:image/png;base64,${article.image}`} alt="article-image"></img>
                <div className="articleAuthorContainer">
                    <p className="authorName">Written by: {article.username}</p>
                    <img src={`data:image/png;base64,${article.userImage}`} alt="author"></img>
                </div>
                <div className="articleButtons">
                    {isSaved ? (
                        <button className="removeArticle" onClick={removeSavedArticle}>
                            Remove from Saved
                        </button>
                    ) : (
                        <button className="saveArticle" onClick={saveArticle}>
                            Save Article
                        </button>
                    )}
                    <Link
                        className={`deleteArticle ${article.isAuthor && 'show'}`}
                        to="/mainPage/article/deleteArticle"
                        state={article.id}
                    >
                        Delete Article
                    </Link>
                </div>
            </article>
            <Footer />
        </section>
    );
}
