import LoginCredential from '/src/components/Login/LoginCredential.jsx';
import '/src/stylesheet/Login/Login.css';
import '/src/stylesheet/Login/LoginMediaQuery.css';

export default function Login()
{
    return(
        <>
            <section className="loginSection">
                <h1 className="loginTitle">Login</h1>
                <LoginCredential credentialCapital="Username" credential="username"/>
                <LoginCredential credentialCapital="Password" credential="password" />
                <a>Forgot password?</a>
                <button className="loginButton">LOGIN</button>
                <div className="signUpContainer">
                    <p>Not registered yet?</p>
                    <a>SIGN UP</a>
                </div>
            </section>
        </>
    );
};