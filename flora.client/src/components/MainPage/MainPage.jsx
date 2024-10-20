import '/src/stylesheet/MainPage/MainPage.css';
import '/src/stylesheet/MainPage/MainPageBackground.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import Pagination from '/src/components/MainPage/Pagination/Pagination.jsx';
import { nanoid } from 'nanoid';

export default function MainPage() {
    const inputId = nanoid();
    return (
        <>
            <NavBar />
            <section className="mainPageSection">
                <div className="searchContainer">
                    <input type="text" placeholder="Search for articles" id={inputId} />
                    <button>Search</button>
                </div>
                <Pagination />
            </section>
            <Footer />
        </>
    );
}