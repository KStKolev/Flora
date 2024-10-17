/* eslint-disable react/prop-types */
import '/src/stylesheet/Register/RegisterCredential.css';

export default function RegisterCredential(props) {

    return (
        <>
            <div className="registerInput">
                <label>{props.label}</label>
                <input type="text" />
            </div>
        </>
    );
}