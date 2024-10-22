import '/src/stylesheet/MainPage/NavBar/Account.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';

export default function Account() {
    return (
        <>
            <NavBar />
            <section className="accountSection">
                <div className="accountContainer">
                    <img src="" alt="accountPicture"></img>
                    <div>
                        <p>Name:</p>
                        <p>Email:</p>
                    </div>
                    <button>
                        Set profile picture
                    </button>
                </div>
            </section>
            <Footer/>
        </>
    );
};