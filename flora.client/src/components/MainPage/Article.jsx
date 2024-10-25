import Footer from '/src/components/MainPage/Footer.jsx';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import '/src/stylesheet/MainPage/Article.css';
import { useLocation} from 'react-router-dom';
export default function Article() {
    const location = useLocation();
    const { article } = location.state || {};

    if (!article) {
        return <div>No article found</div>;
    }

    return (
        <section className="articleSection">
            <NavBar/>
            <article className="article-container">
                <div className="articleDisplayTitle">
                    <h1>{article.title}</h1>
                    <p className="timeToRead">Estimated time: {article.timeToRead} minute/s</p>
                </div>
                <p className="articleDisplayDescription">{article.description}</p>
                <img src={`data:image/png;base64,${article.image}`} alt="article-image"></img>
                <div className="articleAuthorContainer">
                    <p className="authorName">Written by: {article.username}</p>
                    <img src={`data:image/png;base64,${article.userImage}`}></img>
                </div>
            </article>
            <Footer />
        </section>
    );
}