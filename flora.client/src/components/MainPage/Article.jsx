import Footer from '/src/components/MainPage/Footer.jsx';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import '/src/stylesheet/MainPage/Article.css';
export default function Article() {
    return (
        <>
            <NavBar/>
            <article className="article-container">
                <h1>Article Name</h1>
                <div>
                    <p>Article by Name</p>
                    <p>Time to reload</p>
                </div>
                <p>
                    Description
                </p>
                <img src="" alt="article-image"></img>
            </article>
            <Footer />
        </>
    );
}