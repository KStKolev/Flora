/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '/src/stylesheet/MainPage/MainPage.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import Pagination from '/src/components/MainPage/Pagination/Pagination.jsx';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';

export default function MainPage() {
    const inputId = nanoid();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page'), 10) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [articlesPerPage] = useState(3);
    const [empty, setEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const pageFromURL = parseInt(queryParams.get('page'), 10) || 1;
        setCurrentPage(pageFromURL);
    }, [location.search]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/mainPage?page=${pageNumber}`);
    };

    useEffect(() => {
        fetch('http://localhost:5155/api/main/loadArticles')
            .then(response => response.text())
            .then(text => {
                if (text) {
                    const data = JSON.parse(text);
                    setArticles(data);
                    setFilteredArticles(data);
                    setEmpty(data.length === 0);
                } else {
                    setEmpty(true);
                }
            });
    }, []);

    const goToCreate = () => {
        navigate("/mainPage/createArticle");
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
        setCurrentPage(1);
        navigate(`/mainPage?page=1`);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredArticles(articles);
        setCurrentPage(1);
        navigate(`/mainPage?page=1`);
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <>
            <section className="mainPageSection">
                <NavBar />
                <article className="mainPageArticle">
                    <div className="searchContainer">
                        <input
                            className="articleSearchInput"
                            type="text"
                            placeholder="Search for articles"
                            id={inputId}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button onClick={clearSearch}>Clear</button>
                    </div>
                    {empty && filteredArticles.length === 0 ? (
                        <div className="createFirstArticleContainer" onClick={goToCreate}>
                            <p>Click here to create the first article!</p>
                        </div>
                    ) : (
                        currentArticles.map(article => (
                            <div key={article.id} className="articleContainer">
                                <h2>{article.title}</h2>
                                {article.image && (
                                    <img src={`data:image/png;base64,${article.image}`} alt="Article image" />
                                )}
                                <Link className="articleLink" to="/mainPage/article" state={{ article }}>Go to Article</Link>
                            </div>
                        ))
                    )}
                    <Pagination
                        articlesPerPage={articlesPerPage}
                        totalArticles={filteredArticles.length}
                        paginate={handlePageChange}
                        currentPage={currentPage} />
                </article>
                <Footer />
            </section>
        </>
    );
}