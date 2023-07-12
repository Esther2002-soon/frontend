import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Delete(props) {
  const navigate = useNavigate();


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;
    // call Delete API
    try {
      const response = await axios.delete(
        "http://localhost:8000/user/",
        {
          headers: { Authorization: token }
        }
      );
  
      navigate("/");
      props.setPage("login")
  
      toast.success(response.data);
  
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.detail);
    }
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Delete Confirmation
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Are you sure you want to delete your Account?
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none"
          >
            Confirm
          </button>
          <p className="mt-4 text-sm">
            Back to{" "}
            <Link
              to="/?home"
              onClick={() => props.setPage("home")}
            >
              <span className="underline cursor-pointer">Profile</span>
            </Link>
          </p>
        </div>
        
      </form>
      
    </React.Fragment>
  );
}