/* eslint-disable no-case-declarations */
import '/src/stylesheet/ForgotPassword/ForgotPassword.css'; 
import '/src/stylesheet/ForgotPassword/ForgotPasswordMediaQuery.css';
import '/src/stylesheet/Background/GradientBackground.css';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import ForgotPasswordCredential from '/src/components/ForgotPassword/ForgotPasswordCredential.jsx';

export default function ForgotPassword() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitErrors] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async () =>
    {
        const validationErrors = Object.keys(errors).some((key) => errors[key] !== '');
        if (validationErrors) return;

        const response = await fetch('http://localhost:5155/api/account/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                newPassword: newPassword
            })
        });

        if (response.ok) {
            goToLogin();
        } else {
            setSubmitErrors('User was not found.');
        }
        handleClearInputs();
    }

    const handleBlur = (field, value) => {
        validateField(field, value);
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        setSubmitErrors('');
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                if (!value || value.length < 4) {
                    error = "Username must be at least 4 characters long.";
                }
                break;
            case 'email':
                {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value || !emailPattern.test(value)) {
                        error = "Enter a valid email address.";
                    }
                    break;
                }
            case 'newPassword':
                if (value.length < 8 || value.length > 12) {
                    error = "Password must be between 8 and 12 characters long.";
                }
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleClearInputs = () => {
        setUserName('');
        setEmail('');
        setNewPassword('');
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <>
            <section className="forgotPasswordSection">
                <div className="forgotPasswordContainer">
                    <h1>Forgot Password</h1>
                    <div className="forgotPasswordCredentials">
                        <ForgotPasswordCredential
                            label="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            error={errors.username}
                            onBlur={() => handleBlur('username', userName)}
                            onFocus={() => handleFocus('username')} />

                        <ForgotPasswordCredential
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            onBlur={() => handleBlur('email', email)}
                            onFocus={() => handleFocus('email')} />

                        <ForgotPasswordCredential
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={errors.newPassword}
                            onBlur={() => handleBlur('newPassword', newPassword)}
                            onFocus={() => handleFocus('newPassword')} />
                    </div>
                    <button className="submitNewPasswordButton" onClick={handleForgotPassword}>Submit</button>
                    {submitError && <p className="forgotPasswordError">{submitError}</p>}
                </div>
            </section>
        </>
    );
}