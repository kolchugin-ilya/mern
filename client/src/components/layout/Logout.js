import React from 'react';
import axios from "axios";
import {setSession} from "../../store/actions/login-actions";
import {useDispatch} from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    axios.post("http://localhost:3001/logout", {}, {withCredentials: true})
        .then(response => {
            localStorage.clear()
            dispatch(setSession({name: "", role: ""}))
            window.location = "/"
        })
        .catch(error => {
            console.log("check login error", error);
        });
    return null;
};

export default Logout;
