/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '/src/stylesheet/MainPage/MainPage.css';
import Pagination from '/src/components/MainPage/Pagination/Pagination.jsx';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('https://localhost:7126/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        const pageFromURL = parseInt(queryParams.get('page'), 10) || 1;
        setCurrentPage(pageFromURL);
    }, [location.search]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/mainPage?page=${pageNumber}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch('https://localhost:7126/api/main/loadArticles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        setSearchQuery(event.target.value);
        setCurrentPage(1);
        navigate(`/mainPage?page=1`);
    };

    useEffect(() => {
        let filtered = articles;

        if (searchQuery) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(article =>
                article.categoryId === Number(selectedCategory)
            );
        }

        setFilteredArticles(filtered);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, articles]);

    const clearSearch = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setFilteredArticles(articles);
        setCurrentPage(1);
        navigate(`/mainPage?page=1`);
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <section className="mainPageSection">
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

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>

                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

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
                            <p>{article.categoryName}</p>

                            {article.imageUrl && (<img src={article.imageUrl} alt="Article image" /> )}
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
        </section>
    );
}