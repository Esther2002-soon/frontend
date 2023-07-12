import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [formRegister, setFormRegister] = useState({
        username: "",
        password: "",
        birthday: ""
    });
    const onChangeForm = (label, event) => {
        switch (label) {
          case "username":
            setFormRegister({ ...formRegister, username: event.target.value });
            break;
          case "password":
            setFormRegister({ ...formRegister, password: event.target.value });
            break;

        }
      };

    useEffect(() => {
        // get token from local storage
        const auth_token = localStorage.getItem("auth_token");
        const auth_token_type = localStorage.getItem("auth_token_type");
        const token = auth_token_type + " " + auth_token;

        //  fetch data from get user api
        axios
            .get("http://localhost:8000/user/", {
                headers: { Authorization: token },
            })
            .then((response) => {
                console.log(response);
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onClickHandler = (event) => {
        event.preventDefault();

        // remove token form local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_type");
        navigate("/")
        // notif
        toast("See You !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // reload page
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const editHandler = (event) => {
        event.preventDefault();
        navigate("/?edit")
        props.setPage("edit");
    };
    const deleteHandler = (event) => {
        event.preventDefault();
        navigate("/?delete")
        props.setPage("delete");
    };
    return (

        <React.Fragment>

                    <div className="text-center mt-2 text-3xl font-medium">{user.username}</div>
                    <div className="px-6 text-center mt-2 font-light text-sm">
                        <p>{user.birthday}</p>
                    </div>
                    <hr className="mt-8"></hr>
                    <div className="flex p-4">
                        <div className="w-1/2 text-center">
                            Created Time
                            <div className="px-6 text-center mt-2 font-light text-sm">
                                <p>{user.create_time}</p>
                            </div>
                        </div>

                        <div className="w-0 border border-gra-300"></div>
                        <div className="w-1/2 text-center">
                            Last Login
                            <div className="px-6 text-center mt-2 font-light text-sm">
                                <p>{user.last_login}</p>
                            </div>
                        </div>

                    </div>

                    <hr className="mt-3"></hr>
                    <div className="flex p-2">
                        <div className="w-full text-center">

                            <button
                                onClick={(event) => {
                                    onClickHandler(event);
                                }}
                                className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none"
                            >
                                Log out
                            </button>

                        </div>
                    </div>
                    
                        <div className="flex p-2">
                            <div className="w-full text-center">
                                <button 
                                onClick={(event) => {
                                    editHandler(event);
                                }}
                                className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none">
                                    Edit Information
                                </button>
                            </div>
                        </div>


                    <div className="flex p-2">
                        <div className="w-full text-center">

                            <button
                                onClick={(event) => {
                                    deleteHandler(event);
                                }}
                                className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none"
                            >
                                Delete User
                            </button>

                        </div>
                    </div>
                    <hr className="mt-3"></hr>
                    
        </React.Fragment>

    );
}