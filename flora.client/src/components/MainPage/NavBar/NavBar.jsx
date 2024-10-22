import '/src/stylesheet/MainPage/NavBar/NavBar.css';
import '/src/stylesheet/MainPage/NavBar/NavBarMediaQuery.css';
import DropDownMenu from '/src/components/MainPage/NavBar/DropDownMenu.jsx';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [isActive, setIsActive] = useState(true);

    const clickPhoneNav = () => {
        setIsActive(!isActive);
        let dropDownElement = document.querySelector(".dropDownMenu");
        if (isActive === false) {
            dropDownElement.style.display = "none";
        } else if (isActive === true) {
            dropDownElement.style.display = "block";
        }
    };

    const handleResize = () => {
        let dropDownElement = document.querySelector(".dropDownMenu");
        if (window.innerWidth > 400) {
            setIsActive(true);
            dropDownElement.style.display = "none";
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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