import '/src/stylesheet/MainPage/NavBar/Account.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export default function Account() {
    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const inputId = nanoid();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch('https://localhost:7126/api/user/getUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => {
            setUser(data);
        });
    }, []);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) {
            return;
        }

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch('https://localhost:7126/api/user/uploadImage', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
    };


    return (
        <section className="accountSection">
            <div className="accountContainer">
                {user.imageUrl && (
                    <img src={user.imageUrl || "/src/assets/anonymousUser.png"} alt="accountPicture" />
                )}

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
    );
};