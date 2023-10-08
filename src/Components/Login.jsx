import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("user", user);
            localStorage.setItem("uid", user.uid);
            navigate("/body");
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to validate email format
    function isValidEmail(email) {
        // Use a regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <form onSubmit={loginUser}>
            <div className='loginMain'>
                <h1 className='loginHeading'>LOGIN FORM</h1>
                <div className='inputContainer'>
                    <label className='label' htmlFor='email'>
                        Email Address
                    </label>
                    <input className='input' type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
                    <label className='label' htmlFor='password'>
                        Password
                    </label>
                    <input className='input' type='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Link className='signupLink' to='/signup'>
                    Don't Have An Account?
                </Link>
                <button type='submit' className='loginBtn' disabled={loading}>
                    {loading ? "Logging In..." : "LOGIN"}
                </button>
            </div>
        </form>
    );
};

export default Login;
