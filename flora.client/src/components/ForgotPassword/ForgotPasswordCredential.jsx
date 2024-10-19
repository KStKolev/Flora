/* eslint-disable react/prop-types */
import { nanoid } from 'nanoid';

export default function ForgotPasswordCredential(props) {
    const inputId = nanoid();

    return (
        <>
            <div className="forgotPasswordCredentialsContainer">
                <label htmlFor={inputId}>{props.label}</label>
                <input
                    type="text"
                    id={inputId}
                    value={props.value}
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    onChange={props.onChange}
                />
                {props.error && <p className="forgotErrorMessage">{props.error}</p>}
            </div>
        </>
    );
};