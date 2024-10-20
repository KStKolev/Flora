/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import '/src/stylesheet/Register/Register.css';
import '/src/stylesheet/Register/RegisterMediaQuery.css';
import '/src/stylesheet/Background/GradientBackground.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterCredential from '/src/components/Register/RegisterCredential.jsx';

export default function Register() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState('');
    const [submitError, setSubmitErrors] = useState('');
    const navigate = useNavigate();

    const handleClearInputs = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirm('');
    }

    const handleRegister = async () => {
        const validationErrors = Object.keys(errors).some((key) => errors[key] !== '');
        if (validationErrors) return;

        const response = await fetch('http://localhost:5155/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/jsx; charset=utf-8'
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                password: password,
                passwordConfirm: confirm
            })
        });

        if (response.ok) {
            goToLogin();
        } else {
            setSubmitErrors('User created/Wrong credentials.');
        }
        handleClearInputs();
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
            case 'password':
                if (value.length < 8 || value.length > 12) {
                    error = "Password must be between 8 and 12 characters long.";
                }
                break;
            case 'confirm':
                if (confirm !== value) {
                    error = "Passwords do not match.";
                }
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleBlur = (field, value) => {
        validateField(field, value);
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        setSubmitErrors('');
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <>
            <section className="registrationSection">
                <h1 className="registerTitle">Registration</h1>
                <div className="registerCredentialsContainer">
                    <RegisterCredential
                        label="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={errors.username}
                        onBlur={() => handleBlur('username', userName)}
                        onFocus={() => handleFocus('username')} />

                    <RegisterCredential
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        onBlur={() => handleBlur('email', email)}
                        onFocus={() => handleFocus('email')} />

                    <RegisterCredential
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        onBlur={() => handleBlur('password', password)}
                        onFocus={() => handleFocus('password')} />

                    <RegisterCredential
                        label="Confirm Password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        error={errors.confirm}
                        onBlur={() => handleBlur('confirm', password)}
                        onFocus={() => handleFocus('confirm')}/>
                </div>
                <button className="signInButton" onClick={handleRegister}>CREATE ACCOUNT</button>
                {submitError && <p className="registerError">{submitError}</p>}
                <div className="signInContainer">
                    <p>Already have an account?</p>
                    <a onClick={goToLogin}>Sign in</a>
                </div>
            </section>
        </>
    );
}