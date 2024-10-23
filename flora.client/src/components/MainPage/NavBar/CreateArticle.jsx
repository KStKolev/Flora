import '/src/stylesheet/MainPage/NavBar/CreateArticle.css';
import '/src/stylesheet/MainPage/NavBar/CreateArticleMediaQuery.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import { nanoid } from 'nanoId';

export default function CreateArticle() {
    const inputId = nanoid();

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (Number(value) > 999) {
            event.target.value = '999';
        }
        else if (Number(value) < 1) {
            event.target.value = '1';
        }
    };

    return (
        <>
            <NavBar />
            <section className="createArticleSection">
                <div className="createArticleContainer">
                    <h1>Create Article</h1>
                    <div className="estimatedTimeContainer">
                        <label htmlFor={inputId}>Estimated time:</label>
                        <input id={inputId} type="number" min="1" max="999" onChange={handleInputChange} />
                        <p>minute/s</p>
                    </div>
                    <div className="descriptionContainer">
                        <label htmlFor={inputId}>Description</label>
                        <textarea id={inputId} className="articleDescription" />
                    </div>
                    <div className="createImageContainer">
                        <label htmlFor={inputId}>Image:</label>
                        <input id={inputId} type="file" />
                    </div>
                    <button>Create</button>
                </div>
            </section>
            <Footer />
        </>
    );
}