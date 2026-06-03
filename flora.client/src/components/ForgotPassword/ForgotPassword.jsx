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
        const newErrors = {
            username: !userName || userName.length < 4
                ? "Username must be at least 4 characters long."
                : "",

            email: !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                ? "Enter a valid email address."
                : "",

            newPassword: newPassword.length < 8 || newPassword.length > 12
                ? "Password must be between 8 and 12 characters long."
                : ""
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== '');

        if (hasErrors) {
            return;
        }

        const response = await fetch('https://localhost:7126/api/account/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
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

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        setSubmitErrors('');
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
                            onFocus={() => handleFocus('username')} />

                        <ForgotPasswordCredential
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                            onFocus={() => handleFocus('email')} />

                        <ForgotPasswordCredential
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={errors.newPassword}
                            onFocus={() => handleFocus('newPassword')} />
                    </div>
                    <button className="submitNewPasswordButton" onClick={handleForgotPassword}>Submit</button>
                    {submitError && <p className="forgotPasswordError">{submitError}</p>}
                </div>
            </section>
        </>
    );
}