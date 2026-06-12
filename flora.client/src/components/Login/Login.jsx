import '/src/stylesheet/Login/Login.css';
import '/src/stylesheet/Login/LoginMediaQuery.css';
import '/src/stylesheet/Background/GradientBackground.css';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginCredential from '/src/components/Login/LoginCredential.jsx';

export default function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitError, setSubmitErrors] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleClearInputs = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async () => {
        const newErrors = {
            username: !username
                ? "Username is required."
                : "",

            password: !password
                ? "Password is required."
                : ""
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== '');

        if (hasErrors) {
            return;
        }

        const response = await fetch('https://localhost:7126/api/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);

            setIsAuthenticated(true);

            goToMainPage();
        } else {
            setSubmitErrors('Failed to login.');
        }
        handleClearInputs();
    };

    const goToRegister = () => {
        navigate('/register');
    };

    const goToMainPage = () => {
        navigate('/mainPage?page=1');;
    };

    const goToForgotPassword = () => {
        navigate('/forgotPassword');
    };

    const handleFocus = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        setSubmitErrors('');
    };

    return (
        <>
            <section className="loginSection">
                <h1 className="loginTitle">Login</h1>
                <LoginCredential
                    credentialCapital="Username"
                    credential="username"
                    value={username}
                    error={errors.username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => handleFocus('username')}
                />
                <LoginCredential
                    credentialCapital="Password"
                    credential="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    onFocus={() => handleFocus('password')}
                />
                <a onClick={goToForgotPassword}>Forgot password?</a>
                <button className="loginButton" onClick={handleLogin}>LOGIN</button>
                {submitError && <p className="loginError">{submitError}</p>}
                <div className="signUpContainer">
                    <p>Not registered yet?</p>
                    <a onClick={goToRegister}>SIGN UP</a>
                </div>
            </section>
        </>
    );
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};