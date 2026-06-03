/* eslint-disable react/prop-types */
import '/src/stylesheet/Register/RegisterCredential.css';
import { nanoid } from 'nanoid';

export default function RegisterCredential(props) {
    const inputId = nanoid();


    return (
        <div className="registerInput">
            <label htmlFor={inputId}>{props.label}</label>

            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                id={inputId}
                onFocus={props.onFocus}
            />

            {props.error && <p className="errorMessage">{props.error}</p>}
        </div>
    );
}