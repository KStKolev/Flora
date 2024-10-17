/* eslint-disable react/prop-types */

import RegisterCredential from '/src/components/Register/RegisterCredential.jsx';
import '/src/stylesheet/Register/Register.css';
import '/src/stylesheet/Register/RegisterMediaQuery.css';

export default function Register() {
    return (
        <>
            <section className="registrationSection">
                <h1 className="registerTitle">Registration</h1>
                <div className="registerCredentialsContainer">
                    <RegisterCredential label="Username"/>
                    <RegisterCredential label="Email"/>
                    <RegisterCredential label="Password"/>
                    <RegisterCredential label="Confirm Password"/>
                </div>
                <button className="signInButton">CREATE ACCOUNT</button>
                <div className="signInContainer">
                    <p>Already have an account?</p>
                    <a>Sign in</a>
                </div>
            </section>
        </>
    );
}