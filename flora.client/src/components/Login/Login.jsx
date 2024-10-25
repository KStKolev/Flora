import '/src/stylesheet/Login/Login.css';
import '/src/stylesheet/Login/LoginMediaQuery.css';
import '/src/stylesheet/Background/GradientBackground.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginCredential from '/src/components/Login/LoginCredential.jsx';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitError, setSubmitErrors] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleClearInputs = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async () => {
        const validationErrors = Object.keys(errors).some((key) => errors[key] !== '');
        if (validationErrors) return;

        const response = await fetch('http://localhost:5155/api/account/login', {
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

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                if (!value) {
                    error = "Username is required.";
                }
                break;
            case 'password':
                if (!value) {
                    error = "Password is required.";
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
                    onBlur={() => handleBlur('username', username)}
                    onFocus={() => handleFocus('username')}
                />
                <LoginCredential
                    credentialCapital="Password"
                    credential="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    onBlur={() => handleBlur('password', password)}
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