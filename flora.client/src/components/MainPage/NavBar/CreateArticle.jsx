import '/src/stylesheet/MainPage/NavBar/CreateArticle.css';
import '/src/stylesheet/MainPage/NavBar/CreateArticleMediaQuery.css';
import NavBar from '/src/components/MainPage/NavBar/NavBar.jsx';
import Footer from '/src/components/MainPage/Footer.jsx';
import { useState, useId, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateArticle() {
    const inputId = useId();
    const navigation = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeToRead, setTimeToRead] = useState(1);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (Number(value) > 999) {
            event.target.value = '999';
        }
        else if (Number(value) < 1) {
            event.target.value = '1';
        }
        setTimeToRead(Number(event.target.value));
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'title':
                if (!value || value.length > 30) {
                    error = "Title must be maximum 30 characters long.";
                }
                break;
            case 'description':
                if (!value || value.length > 3000) {
                    error = "Description must be maximum 3000 characters long.";
                }
                break;
            case 'image':
                if (!value) {
                    error = "Image is required.";
                }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleBlur = (field, value) => {
        validateField(field, value);
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    const goToMainPage = () => {
        navigation('/mainPage');
    };

    const handleClearInputs = () => {
        setTitle('');
        setDescription('');
        setTimeToRead(1);
        setImage(null);
        fileInputRef.current.value = null;
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('Image', image);
        formData.append('TimeToRead', timeToRead.toString());

        const response = await fetch('http://localhost:5155/api/article/create', {
            method: 'POST',
            body: formData,
        });
        handleClearInputs();

        if (response.ok) {
            goToMainPage();
        } 
    }

    return (
        <>
            <NavBar />
            <section className="createArticleSection">
                <div className="createArticleContainer">
                    <h1>Create Article</h1>
                    <div className="titleContainer">
                        <label htmlFor={`${inputId}-title`}>Article title</label>
                        <input
                            id={`${inputId}-title`} 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            onBlur={() => handleBlur('title', title)}
                            onFocus={() => handleFocus('title')} />
                        {errors.title && <p className="errorMessage">{errors.title}</p>}
                    </div>
                    <div className="estimatedTimeContainer">
                        <label htmlFor={`${inputId}-time`}>Estimated time:</label>
                        <input
                            id={`${inputId}-time`}
                            type="number"
                            min="1" max="999"
                            value={timeToRead}
                            onChange={handleInputChange}/>
                        <p>minute/s</p>
                    </div>
                    <div className="descriptionContainer">
                        <label htmlFor={`${inputId}-description`}>Description</label>
                        <textarea
                            id={`${inputId}-description`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="articleDescription"
                            onBlur={() => handleBlur('description', description)}
                            onFocus={() => handleFocus('description')} />
                        {errors.description && <p className="errorMessage">{errors.description}</p>}
                    </div>
                    <div className="createImageClass">
                        <div className="createImageContainer">
                            <label htmlFor={`${inputId}-image`}>Image:</label>
                            <input
                                id={`${inputId}-image`}
                                type="file"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                onBlur={() => handleBlur('image', image)}
                                onFocus={() => handleFocus('image')} />
                        </div>
                        {errors.image && <p className="errorMessage">{errors.image}</p>}
                    </div>
                    <button onClick={handleSubmit}>Create</button>
                </div>
            </section>
            <Footer />
        </>
    );
}