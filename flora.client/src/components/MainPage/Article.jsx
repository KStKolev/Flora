import '/src/stylesheet/MainPage/Article.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Article() {
    const location = useLocation();
    const { article } = location.state || {};
    const [isSaved, setIsSaved] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkIfSaved = async () => {
            const response = await fetch(
                `https://localhost:7126/api/save/isArticleSaved/${article.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const result = await response.json();
            setIsSaved(result);
        };

        if (article) {
            checkIfSaved();
        }
    }, [article, token]);

    const saveArticle = async () => {
        const response = await fetch(`https://localhost:7126/api/save/saveArticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(article.id),
        });

        if (response.ok) {
            setIsSaved(true);
        }
    };

    const removeSavedArticle = async () => {
        const response = await fetch(`https://localhost:7126/api/save/removeSavedArticle/${article.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
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
            <article className="article-container">
                <div className="articleDisplayTitle">
                    <h1>{article.title}</h1>
                    <p className="timeToRead">Estimated time: {article.timeToRead} minute/s</p>
                </div>

                <p className="articleCategory">
                    Category: {article.categoryName}
                </p>

                <p className="articleDisplayDescription">{article.description}</p>
                <img src={article.imageUrl} alt="article-image" />

                <div className="articleAuthorContainer">
                    <p className="authorName">Written by: {article.username}</p>
                    <img src={article.userImageUrl} alt="author" />
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

                    {article.isAuthor && (
                        <Link
                            className="deleteArticle"
                            to="/mainPage/article/deleteArticle"
                            state={article.id}
                        >
                            Delete Article
                        </Link>
                    )}
                </div>
            </article>
        </section>
    );
}
