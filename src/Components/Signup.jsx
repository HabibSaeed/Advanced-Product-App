import React, { useState } from 'react';
import "./Signup.css";
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!email || !password || !firstname || !lastname) {
                throw new Error("All fields are required.");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("user", user);

            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={signUp}>
            <div className='signupMain'>
                <h1 className='signupHeading'>SIGN UP FORM</h1>
                <div className='inputContainer'>
                    <input className='input' type='text' id='firstname' placeholder='Enter Your First Name' onChange={(e) => setFirstName(e.target.value)} />
                    <input className='input' type='text' id='lastname' placeholder='Enter Your Last Name' onChange={(e) => setLastName(e.target.value)} />
                    <input className='input' type='text' id='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                    <input className='input' type='password' id='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="error">{error}</p>}
                <Link className='signupLink' to='/'>
                    Already Have An Account?
                </Link>
                <button type="submit" className='signupBtn' disabled={loading}>
                    {loading ? "Signing Up..." : "SIGN UP"}
                </button>
            </div>
        </form>
    );
}

export default Signup;
