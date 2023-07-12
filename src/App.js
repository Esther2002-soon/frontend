import './App.css';
import React, { useState, useEffect } from "react";
import Edit from './form/Edit';
import Register from './form/Register';
import Login from './form/Login';
import Home from "./Home";
import Delete from "./form/Delete"
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {

  const [page, setPage] = useState("login");

  const [token, setToken] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    setToken(auth);
  }, [token]);

  const chosePage = () => {
    if (page === "login") {
      return <Login setPage={setPage} />;
    }
    if (page === "edit") {
      return <Edit setPage={setPage} />;
    }
    if (page === "register") {
      return <Register setPage={setPage} />;
    }
    if (page === "home") {
      return <Home setPage={setPage} />;
    }
    if (page === "delete") {
      return <Delete setPage={setPage} />;
    }
  };
  
  const pages = () => {
      return (
        <div className="min-h-screen bg-green-200 flex justify-center items-center">
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20"  style={{width:"50%"}}>
            {chosePage()}
          </div>
        </div>
      );
  };

  return <React.Fragment>{pages()}</React.Fragment>;
}
export default App;