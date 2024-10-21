import '/src/stylesheet/MainPage/MainPage.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import Pagination from '/src/components/MainPage/Pagination/Pagination.jsx';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const inputId = nanoid();
    const navigate = useNavigate();

    const goToArticle = () => {
        navigate("/mainPage/article");
    };

    return (
        <>
            <NavBar />
            <section className="mainPageSection">
                <div className="searchContainer">
                    <input type="text" placeholder="Search for articles" id={inputId} />
                    <button>Search</button>
                </div>
                <a onClick={goToArticle}>
                    A-test
                </a>
            <Pagination />
            </section>
            <Footer />
        </>
    );
}