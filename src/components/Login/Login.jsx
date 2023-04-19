import React, { useRef, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const emailRef = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("please add at least two uppercase letters");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("please add a special character");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess("Login Successful");
        setError("");
        event.target.email.value = "";
        event.target.password.value = "";
        console.log(loggedUser);
      })
      .catch((error) => {
        setError("invalid login credentials : ", error.message);
      });
  };
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email address");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your mail for password reset");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const showPassword = () => {
    setShow(!show);
  };
  return (
    <div>
      <h3 className="text-primary mt-4">Welcome Back!!</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3 text-left">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label w-100 text-start"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
            name="email"
            required
          />
        </div>
        <div className="mb-3 text-left">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label w-100 text-start"
          >
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            required
          />
        </div>
        <div className="form-group w-100 text-end">
          <input
            type="button"
            onClick={showPassword}
            className="form-control mt-2 mb-4 w-50 bg-warning"
            value="Show Password"
          />
        </div>
        <div className="w-100 text-start">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <p>
        Forgot password?{" "}
        <button onClick={handleResetPassword} className="btn bg-info">
          Reset from here
        </button>
      </p>
      <p>
        New to the site? Please <Link to="/register">Signup</Link>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
