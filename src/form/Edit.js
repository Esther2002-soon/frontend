import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Edit(props) {

    const navigate = useNavigate();
    

    const [formEdit, setFormEdit] = useState({
        username: "",
        password: "",
        birthday: ""
    });
    //default date
    const [birthDate, setBirthDate] = useState(null);

    const formatDate = (date) => {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    };

    const onChangeForm = (label, event) => {
        switch (label) {
            case "username":
                setFormEdit({ ...formEdit, username: event.target.value });
                break;
            case "password":
                setFormEdit({ ...formEdit, password: event.target.value });
                break;
            case "birthday":
                setBirthDate(event);
                setFormEdit({ ...formEdit, birthday: formatDate(event) });
                break;
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formEdit);
        const auth_token = localStorage.getItem("auth_token");
        const auth_token_type = localStorage.getItem("auth_token_type");
        const token = auth_token_type + " " + auth_token;
      
        try {
          const response = await axios.patch(
            "http://localhost:8000/user/",
            formEdit,
            {
              headers: { Authorization: token }
            }
          );
      
          navigate("/");
      
          // add successfully notif
          toast.success(response.data);
      
          // reload page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      
          console.log(response);
        } catch (error) {
          console.log(error);
      
          // add error notif
          if (error.response) {
            toast.error(error.response.data.detail);
          } else {
            toast.error("Username already exist.");
          }
        }
      };
      

    return (
        <React.Fragment>
            
            <div>
                <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                    Edit Information
                </h1>
                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
                    Update your data!
                </p>

            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-blue-300"
                        onChange={(event) => {
                            onChangeForm("username", event);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-blue-300"
                        onChange={(event) => {
                            onChangeForm("password", event);
                        }}
                    />
                    <DatePicker
                        className="block text-sm py-3 px-4 rounded-lg w-64 border outline-none focus:ring focus:outline-none focus:ring-blue-300"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Birthday"
                        selected={birthDate}
                        onChange={(event) => {
                            onChangeForm("birthday", event);
                        }}
                    />

                </div>
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="py-3 w-64 text-xl text-white bg-green-400 rounded-2xl hover:bg-green-500 active:bg-green-600 outline-none">
                        Submit
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

    )
}