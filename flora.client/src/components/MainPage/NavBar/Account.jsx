import '/src/stylesheet/MainPage/NavBar/Account.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function Account() {
    const [user, setUser] = useState({});
    const [image, setImage] = useState("");
    const inputId = nanoid();

    useEffect(() => {
        fetch('http://localhost:5155/api/user/getUser')
            .then(r => r.json()
                .then(data => {
                    setUser(data);
                })
            );
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleUpload = async () => {
        const response = await fetch('http://localhost:5155/api/user/uploadImage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image })
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
    };


    return (
        <>
            <NavBar />
            <section className="accountSection">
                <div className="accountContainer">
                    <img src={`data:image/png;base64,${user.image}`} alt="accountPicture"></img>
                    <div>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <input id={inputId} type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>
                        Set profile picture
                    </button>
                </div>
            </section>
            <Footer/>
        </>
    );
};