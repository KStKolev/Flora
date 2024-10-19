/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import '/src/stylesheet/Login/LoginCredential.css';
import { useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

export default function LoginCreadential(props)
{
    useEffect(() => {
        if (props.credential === "password") {
            let passwordInput = document.getElementsByClassName("loginInput")[1];
            passwordInput.type = "password";
        }
    }, []);

    const icon = props.credential === "password" ? faLock : faUser;
    const inputId = nanoid();

    return (
        <div className="loginCredentialsContainer">
            <label htmlFor={inputId}>{`${props.credentialCapital}`}</label>
            <div>
                <FontAwesomeIcon icon={icon} className="loginIcon"/>
                <input
                    type="text"
                    placeholder={`Type your ${props.credential}`}
                    className="loginInput"
                    value={props.value}
                    onChange={props.onChange}
                    id={inputId}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                />
            </div>
            {props.error && <p className="errorMessage">{props.error}</p>}
        </div>
    );
}