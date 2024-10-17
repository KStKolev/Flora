/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import '/src/stylesheet/Login/LoginCredential.css';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function LoginCreadential(props)
{
    useEffect(() => {
        if (props.credential === "password") {
            let passwordInput = document.getElementsByClassName("loginInput")[1];
            passwordInput.type = "password";
        }
    }, []);

    const icon = props.credential === "password" ? faLock : faUser;

    return (
        <div className="loginCredentialsContainer">
            <label>{`${props.credentialCapital}`}</label>
            <div>
                <FontAwesomeIcon icon={icon} />
                <input type="text" placeholder={`Type your ${props.credential}`} className="loginInput" />
            </div>
            <hr />
        </div>
    );
}