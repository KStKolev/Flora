import '/src/stylesheet/MainPage/NavBar/CreateArticle.css';
import '/src/stylesheet/MainPage/NavBar/CreateArticleMediaQuery.css';
import { useState, useId, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateArticle() {
    const inputId = useId();
    const navigation = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeToRead, setTimeToRead] = useState(1);
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch('https://localhost:7126/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

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
        setCategoryId("");
        setImage(null);
        fileInputRef.current.value = null;
    };

    const handleSubmit = async () => {
        const newErrors = {
            title: !title || title.length > 30
                ? "Title must be maximum 30 characters long."
                : "",

            description: !description || description.length > 3000
                ? "Description must be maximum 3000 characters long."
                : "",

            category: !categoryId
                ? "Please select a category."
                : "",

            image: !image
                ? "Image is required."
                : ""
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== '');

        if (hasErrors) {
            return;
        }

        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('CategoryId', Number(categoryId).toString());
        formData.append('Image', image);
        formData.append('TimeToRead', timeToRead.toString());

        const token = localStorage.getItem("token");

        const response = await fetch('https://localhost:7126/api/article/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        handleClearInputs();

        if (response.ok) {
            goToMainPage();
        } 
    }

    return (
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
                        onChange={handleInputChange} />

                    <p>minute/s</p>
                </div>

                <div className="descriptionContainer">
                    <label htmlFor={`${inputId}-description`}>Description</label>
                    <textarea
                        id={`${inputId}-description`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="articleDescription"
                        onFocus={() => handleFocus('description')} />
                    {errors.description && <p className="errorMessage">{errors.description}</p>}
                </div>

                <div className="categoryContainer">
                    <label htmlFor={`${inputId}-category`}>Category</label>

                    <select
                        id={`${inputId}-category`}
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="errorMessage">
                            {errors.category}
                        </p>
                    )}
                </div>

                <div className="createImageClass">
                    <div className="createImageContainer">
                        <label htmlFor={`${inputId}-image`}>Image:</label>
                        <input
                            id={`${inputId}-image`}
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            onFocus={() => handleFocus('image')} />
                    </div>
                    {errors.image && <p className="errorMessage">{errors.image}</p>}
                </div>

                <button onClick={handleSubmit}>Create</button>
            </div>
        </section>
    );
}