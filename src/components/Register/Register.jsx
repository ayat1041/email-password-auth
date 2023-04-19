import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("please add at least two uppercase letters");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("please add a special character");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        event.target.email.value = "";
        event.target.password.value = "";
        const name = event.target.name.value;
        event.target.name.value = "";
        setSuccess("Successfully Registered!");
        sendVerificationEmail(loggedUser);
        updateUserData(result.user,name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("Please check your mail and spam folders for verification");
    });
  };
  const showPassword = () => {
    setShow(!show);
  };
  const updateUserData = (user,name) =>{
    updateProfile(user,{
      displayName: name
    })
    .then(()=>{
      console.log("username updated")
    })
    .catch(error=>{
      setError(error.message);
    })
  }
  // const handlePasswordBlur = (event) => {
  //   console.log(event.target.value);
  // };
  return (
    <div>
      <h2 className="text-success mt-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group w-100 text-start">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control mt-2"
          />
        </div>
        <div className="form-group w-100 text-start">
          <label htmlFor="email">Email Address</label>
          <input
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
            className="form-control mt-2"
          />
        </div>
        <div className="form-group w-100 text-start">
          <label htmlFor="password">Password</label>
          <input
            // onBlur={handlePasswordBlur}
            type={show ? "text" : "password"}
            name="password"
            id="password"
            className="form-control mt-2"
          />
        </div>
        <div className="form-group w-100 text-end">
          <input
            type="button"
            onClick={showPassword}
            className="form-control mt-2 w-50 bg-warning"
            value="Show Password"
          />
        </div>
        <div className="text-start">
          <button type="submit" className="btn btn-primary mt-2">
            Register
          </button>
        </div>
      </form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
      <p>
        Already been to the site? Please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
