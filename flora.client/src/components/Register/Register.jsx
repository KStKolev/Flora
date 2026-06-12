/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import '/src/stylesheet/Register/Register.css';
import '/src/stylesheet/Register/RegisterMediaQuery.css';
import '/src/stylesheet/Background/GradientBackground.css';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterCredential from '/src/components/Register/RegisterCredential.jsx';

export default function Register({ setIsAuthenticated }) {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitErrors] = useState('');
    const navigate = useNavigate();

    const handleClearInputs = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirm('');
    }

    const handleRegister = async () => {
        const newErrors = {
            username: !userName || userName.length < 4
                ? "Username must be at least 4 characters long."
                : "",

            email: !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                ? "Enter a valid email address."
                : "",

            password: password.length < 8 || password.length > 12
                ? "Password must be between 8 and 12 characters long."
                : "",

            confirm: password !== confirm
                ? "Passwords do not match."
                : ""
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== '');

        if (hasErrors) {
            return;
        }

        const response = await fetch('https://localhost:7126/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                password: password,
                passwordConfirm: confirm
            })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);

            setIsAuthenticated(true);

            navigate('/mainPage');
        } else {
            setSubmitErrors('User already exists or credentials are invalid.');
        }

        handleClearInputs();
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        setSubmitErrors('');
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <section className="registrationSection">
            <h1 className="registerTitle">Registration</h1>

            <div className="registerCredentialsContainer">
                <RegisterCredential
                    label="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    error={errors.username}
                    onFocus={() => handleFocus('username')} />

                <RegisterCredential
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    onFocus={() => handleFocus('email')} />

                <RegisterCredential
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    onFocus={() => handleFocus('password')} />

                <RegisterCredential
                    label="Confirm Password"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    error={errors.confirm}
                    onFocus={() => handleFocus('confirm')}/>
            </div>

            <button className="signInButton" onClick={handleRegister}>CREATE ACCOUNT</button>

            {submitError && <p className="registerError">{submitError}</p>}

            <div className="signInContainer">
                <p>Already have an account?</p>
                <a onClick={goToLogin}>SIGN IN</a>
            </div>
        </section>
    );
}

Register.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};