import '/src/stylesheet/MainPage/MainPage.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import Pagination from '/src/components/MainPage/Pagination/Pagination.jsx';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function SavedArticles() {
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [articlesPerPage] = useState(3);
    const [empty, setEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetch('http://localhost:5155/api/save/getSavedArticles')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    setArticles(data);
                    setFilteredArticles(data);
                    setEmpty(data.length === 0);
                } else {
                    setEmpty(true);
                }
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredArticles(articles);
        setCurrentPage(1);
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
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button onClick={clearSearch}>Clear</button>
                    </div>
                    {empty && filteredArticles.length === 0 ? (
                        <div className="emptyMessage">
                            <p>No saved articles found.</p>
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
                        currentPage={currentPage}
                    />
                </article>
                <Footer />
            </section>
        </>
    );
}
