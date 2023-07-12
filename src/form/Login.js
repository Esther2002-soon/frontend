import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login(props) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (label, event) => {
    setLoginForm({ ...loginForm, [label]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(loginForm);
    // call login API
    try {
      const response = await axios.post("http://localhost:8000/login", loginForm);
      console.log(response);
      // Save token to local storage
      localStorage.setItem("auth_token", response.data);
      localStorage.setItem("auth_token_type", "Bearer");
      // Show success notification
      toast.success(response.data.detail);

      navigate("/?home")
      props.setPage("home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.detail);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Welcome to MyUser
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Please login to your account
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-blue-300"
            onChange={(event) => onChangeForm("username", event)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-blue-300"
            onChange={(event) => onChangeForm("password", event)}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm">
            You don't have an account?{" "}
            <Link
              to="/?register"
              onClick={() => props.setPage("register")}
            >
              <span className="underline cursor-pointer">Register</span>
            </Link>
          </p>
        </div>
        
      </form>
      
    </React.Fragment>
  );
}