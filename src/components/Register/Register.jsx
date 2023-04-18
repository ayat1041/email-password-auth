import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebase/firebase.config'

const auth = getAuth(app);

const Register = () => {
    const [email,setEmail] = useState('');
    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    
    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder="your email address"/>
                <br />
                <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='your password'/>
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;