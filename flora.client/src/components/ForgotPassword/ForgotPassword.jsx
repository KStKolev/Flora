import '/src/stylesheet/ForgotPassword/ForgotPassword.css'; 
import '/src/stylesheet/ForgotPassword/ForgotPasswordMediaQuery.css';

export default function ForgotPassword()
{
    return (
        <>
            <section className="forgotPasswordSection">
                <div className="forgotPasswordContainer">
                    <h1>Forgot Password</h1>
                    <div className="forgotPasswordCredentials">
                        <label>Username</label>
                        <input type="text" />
                        <label>Email</label>
                        <input type="text" />
                        <label>New Password</label>
                        <input type="text" />
                    </div>
                    <button className="submitNewPasswordButton">Submit</button>
                </div>
            </section>
            
        </>);
}