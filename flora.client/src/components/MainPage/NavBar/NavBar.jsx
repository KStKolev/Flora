import '/src/stylesheet/MainPage/NavBar/NavBar.css';
import '/src/stylesheet/MainPage/NavBar/NavBarMediaQuery.css';
import DropDownMenu from '/src/components/MainPage/NavBar/DropDownMenu.jsx';
export default function NavBar() {
    const clickPhoneNav = () => {
        let dropDownElement = document.querySelector('.dropDownMenu');
        dropDownElement.classList.toggle('show');
    };

    return (
        <ul className="navigationBar">
            <li className="phone-nav">
                <button className="button-phone-nav" onClick={clickPhoneNav}>
                    <div></div>
                    <p></p>
                </button>
            </li>
            <DropDownMenu />
            <li className="dropDownMenu">
                <ul className="menuContainer">
                    <DropDownMenu />
                </ul>
            </li>
        </ul>
    );
};